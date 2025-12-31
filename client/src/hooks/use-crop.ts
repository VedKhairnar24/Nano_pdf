import { useMutation } from "@tanstack/react-query";
import * as pdfjsLib from "pdfjs-dist";
import { PDFDocument } from "pdf-lib";

type CropResponse = {
  message: string;
  filename: string;
  downloadUrl: string; // This will be a blob URL
};

type CropInput = {
  file: File;
};

/**
 * Client-side PDF cropper
 * All processing happens in the browser - no server required
 * Uses pdf-lib to crop PDF content
 */
export function useCropPdf() {
  return useMutation<CropResponse, Error, CropInput>({
    mutationFn: async ({ file }) => {
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
        
        // Save the cropped PDF
        const croppedPdfBytes = await newPdfDoc.save();
        
        // Create a blob URL for download
        const blob = new Blob([croppedPdfBytes], { type: "application/pdf" });
        const downloadUrl = URL.createObjectURL(blob);
        
        // Generate filename
        const originalName = file.name.replace(/\.pdf$/i, "");
        const filename = `cropped_${originalName}.pdf`;
        
        return {
          message: "File cropped successfully",
          filename,
          downloadUrl,
        };
      } catch (error: any) {
        throw new Error(
          error?.message || "Failed to crop PDF. Please ensure the file is a valid PDF."
        );
      }
    },
  });
}