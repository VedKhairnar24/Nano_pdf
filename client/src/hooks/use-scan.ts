import { useMutation } from "@tanstack/react-query";
import { PDFDocument } from "pdf-lib";
import { useState } from "react";

type ScanResponse = {
  message: string;
  filename: string;
  downloadUrl: string; // This will be a blob URL
};

type ScanInput = {
  imageFiles: File[];
};

/**
 * Client-side PDF scanner
 * All processing happens in the browser - no server required
 * Uses pdf-lib to create a PDF from images
 */
export function useScanPdf() {
  return useMutation<ScanResponse, Error, ScanInput>({
    mutationFn: async ({ imageFiles }) => {
      try {
        // Create a new PDF document
        const pdfDoc = await PDFDocument.create();
        
        // Process each image file
        for (const file of imageFiles) {
          // Create an image element to load the image
          const imageElement = new Image();
          const imagePromise = new Promise<HTMLImageElement>((resolve, reject) => {
            imageElement.onload = () => resolve(imageElement);
            imageElement.onerror = reject;
            imageElement.src = URL.createObjectURL(file);
          });
          
          const image = await imagePromise;
          
          // Embed the image based on its type
          let embeddedImage;
          if (file.type === 'image/png') {
            embeddedImage = await pdfDoc.embedPng(await file.arrayBuffer());
          } else {
            embeddedImage = await pdfDoc.embedJpg(await file.arrayBuffer());
          }
          
          // Create a new page with the image dimensions
          const { width, height } = embeddedImage.scale(1);
          const page = pdfDoc.addPage([width, height]);
          
          // Draw the image on the page
          page.drawImage(embeddedImage, {
            x: 0,
            y: 0,
            width,
            height,
          });
          
          // Clean up the object URL
          URL.revokeObjectURL(imageElement.src);
        }
        
        // Save the PDF
        const pdfBytes = await pdfDoc.save();
        
        // Create a blob URL for download
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const downloadUrl = URL.createObjectURL(blob);
        
        // Generate filename
        const filename = `scanned_${new Date().getTime()}.pdf`;
        
        return {
          message: "PDF created successfully",
          filename,
          downloadUrl,
        };
      } catch (error: any) {
        throw new Error(
          error?.message || "Failed to create PDF from images. Please ensure all files are valid images."
        );
      }
    },
  });
}