import { useMutation } from "@tanstack/react-query";
import * as pdfjsLib from "pdfjs-dist";
import { PDFDocument } from "pdf-lib";

type CompressResponse = {
  message: string;
  filename: string;
  downloadUrl: string; // This will be a blob URL
};

type CompressInput = {
  file: File;
  compressionLevel: number;
};

/**
 * Client-side PDF compressor
 * All processing happens in the browser - no server required
 * Uses pdf-lib to compress PDF content
 */
export function useCompressPdf() {
  return useMutation<CompressResponse, Error, CompressInput>({
    mutationFn: async ({ file, compressionLevel }) => {
      try {
        // Configure pdfjs worker
        if (typeof window !== "undefined") {
          pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
        }
        
        // Read file as ArrayBuffer
        const fileBytes = await file.arrayBuffer();
        
        // Load the PDF using pdfjs
        const loadingTask = pdfjsLib.getDocument({
          data: fileBytes,
        });
        
        const pdf = await loadingTask.promise;
        
        // Create a new PDF using pdf-lib
        const newPdfDoc = await PDFDocument.create();
        
        // Process each page from the original PDF
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const viewport = page.getViewport({ scale: compressionLevel / 50 }); // Adjust scale based on compression level
          
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
          
          // Convert canvas to image (this helps with compression)
          const imageBytes = await new Promise<Uint8Array>((resolve, reject) => {
            canvas.toBlob((blob) => {
              if (!blob) {
                reject(new Error("Failed to convert canvas to blob"));
                return;
              }
              blob.arrayBuffer().then((buffer) => {
                resolve(new Uint8Array(buffer));
              }).catch(reject);
            }, "image/jpeg", compressionLevel / 100); // Use JPEG with quality based on compression level
          });
      
          // Embed image in new PDF
          const image = await newPdfDoc.embedJpg(imageBytes);
          const newPage = newPdfDoc.addPage([viewport.width, viewport.height]);
          newPage.drawImage(image, {
            x: 0,
            y: 0,
            width: viewport.width,
            height: viewport.height,
          });
        }
        
        // Save the compressed PDF
        const compressedPdfBytes = await newPdfDoc.save();
        
        // Create a blob URL for download
        const blob = new Blob([compressedPdfBytes], { type: "application/pdf" });
        const downloadUrl = URL.createObjectURL(blob);
        
        // Generate filename
        const originalName = file.name.replace(/\.pdf$/i, "");
        const filename = `compressed_${originalName}.pdf`;
        
        return {
          message: "File compressed successfully",
          filename,
          downloadUrl,
        };
      } catch (error: any) {
        throw new Error(
          error?.message || "Failed to compress PDF. Please ensure the file is a valid PDF."
        );
      }
    },
  });
}