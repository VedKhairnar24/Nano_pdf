import { useMutation } from "@tanstack/react-query";
import * as pdfjsLib from "pdfjs-dist";
import { PDFDocument } from "pdf-lib";

// Configure pdfjs worker - use local worker from public folder
if (typeof window !== "undefined") {
  // Use the worker file from the public folder (copied during build)
  pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
}

type UnlockResponse = {
  message: string;
  filename: string;
  downloadUrl: string; // This will be a blob URL
};

type UnlockInput = {
  file: File;
  password: string;
};

/**
 * Client-side PDF unlocker
 * All processing happens in the browser - no server required
 * Uses pdfjs-dist to decrypt the PDF with password, then reconstructs it using pdf-lib
 */
export function useUnlockPdf() {
  return useMutation<UnlockResponse, Error, UnlockInput>({
    mutationFn: async ({ file, password }) => {
      try {
        // Read file as ArrayBuffer
        const fileBytes = await file.arrayBuffer();
        
        // Use pdfjs-dist to load and decrypt the PDF with password
        const loadingTask = pdfjsLib.getDocument({
          data: fileBytes,
          password: password,
        });
        
        const pdf = await loadingTask.promise;
        
        // Create a new PDF using pdf-lib to reconstruct the decrypted content
        const newPdfDoc = await PDFDocument.create();
        
        // Process each page from the decrypted PDF
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const viewport = page.getViewport({ scale: 2.0 }); // Higher scale for better quality
          
          // Render page to canvas
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          if (!context) {
            throw new Error("Could not get canvas context");
          }
          
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          
          await page.render({
            canvasContext: context,
            viewport: viewport,
          }).promise;
          
          // Convert canvas to image
          const imageBytes = await new Promise<Uint8Array>((resolve, reject) => {
            canvas.toBlob((blob) => {
              if (!blob) {
                reject(new Error("Failed to convert canvas to blob"));
                return;
              }
              blob.arrayBuffer().then((buffer) => {
                resolve(new Uint8Array(buffer));
              }).catch(reject);
            }, "image/png");
          });
          
          // Embed image in new PDF
          const image = await newPdfDoc.embedPng(imageBytes);
          const newPage = newPdfDoc.addPage([viewport.width, viewport.height]);
          newPage.drawImage(image, {
            x: 0,
            y: 0,
            width: viewport.width,
            height: viewport.height,
          });
        }
        
        // Save the decrypted PDF
        const decryptedPdfBytes = await newPdfDoc.save();
        
        // Create a blob URL for download
        const blob = new Blob([decryptedPdfBytes], { type: "application/pdf" });
        const downloadUrl = URL.createObjectURL(blob);
        
        // Generate filename
        const originalName = file.name.replace(/\.pdf$/i, "");
        const filename = `unlocked_${originalName}.pdf`;
        
        return {
          message: "File unlocked successfully",
          filename,
          downloadUrl,
        };
      } catch (error: any) {
        // Handle password errors from pdfjs
        if (
          error?.name === "PasswordException" ||
          error?.message?.includes("password") ||
          error?.message?.includes("Incorrect password") ||
          error?.message?.includes("wrong password") ||
          error?.message?.includes("password required")
        ) {
          throw new Error("Incorrect password. Please check and try again.");
        }
        
        // Handle other errors
        throw new Error(
          error?.message || "Failed to unlock PDF. Please ensure the file is valid and password-protected."
        );
      }
    },
  });
}
