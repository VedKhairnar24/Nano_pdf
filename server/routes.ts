import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import multer from "multer";
import path from "path";
import fs from "fs";
import { execFile } from "child_process";

// Configure Multer
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

// Ensure uploads/processed directories exist
if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");
if (!fs.existsSync("processed")) fs.mkdirSync("processed");

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // API: Unlock PDF
  app.post(api.unlock.process.path, upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const password = req.body.password;
      if (!password) {
        return res.status(400).json({ message: "Password is required" });
      }

      const inputPath = req.file.path;
      const outputFilename = `unlocked_${req.file.originalname}`;
      const outputPath = path.join("processed", outputFilename);

      // Use the Python script wrapper (which uses qpdf internally for reliability in this env)
      // Or call qpdf directly. Calling python script satisfies the "Python" requirement better.
      const pythonScript = path.join(process.cwd(), "server", "unlock.py");
      
      execFile("python3", [pythonScript, inputPath, outputPath, password], (error, stdout, stderr) => {
        // Clean up input file
        fs.unlink(inputPath, () => {});

        if (error) {
          console.error("Decryption error:", stderr);
          // Check for password error pattern from qpdf/pikepdf
          if (stderr.includes("invalid password") || stderr.includes("password incorrect") || error.code === 2) {
             return res.status(400).json({ message: "Incorrect password" });
          }
          return res.status(500).json({ message: "Failed to decrypt PDF" });
        }

        // Success
        const downloadUrl = api.unlock.download.path.replace(":filename", outputFilename);
        
        res.json({
          message: "File unlocked successfully",
          filename: outputFilename,
          downloadUrl: downloadUrl
        });
      });

    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // API: Download
  app.get("/api/download/:filename", (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join("processed", filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File not found" });
    }

    res.download(filePath, filename);
  });

  return httpServer;
}
