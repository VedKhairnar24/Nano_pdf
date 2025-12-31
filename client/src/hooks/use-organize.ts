import { useMutation } from "@tanstack/react-query";
import { PDFDocument } from "pdf-lib";

type OrganizeResponse = {
  message: string;
  filename: string;
  downloadUrl: string; // This will be a blob URL
};

type OrganizeInput = {
  files: File[];
};

/**
 * Client-side PDF organizer
 * All processing happens in the browser - no server required
 * Uses pdf-lib to merge PDFs
 */
export function useOrganizePdf() {
  return useMutation<OrganizeResponse, Error, OrganizeInput>({
    mutationFn: async ({ files }) => {
      try {
        // Create a new PDF document
        const pdfDoc = await PDFDocument.create();
        
        // Process each PDF file
        for (const file of files) {
          // Check if it's a PDF file
          if (file.type !== 'application/pdf') {
            throw new Error(`${file.name} is not a PDF file`);
          }
          
          // Load the PDF file
          const arrayBuffer = await file.arrayBuffer();
          const sourcePdf = await PDFDocument.load(arrayBuffer);
          
          // Copy pages from source to new document
          const copiedPages = await pdfDoc.copyPages(sourcePdf, sourcePdf.getPageIndices());
          for (const page of copiedPages) {
            pdfDoc.addPage(page);
          }
        }
        
        // Save the merged PDF
        const mergedPdfBytes = await pdfDoc.save();
        
        // Create a blob URL for download
        const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
        const downloadUrl = URL.createObjectURL(blob);
        
        // Generate filename
        const filename = `organized_${new Date().getTime()}.pdf`;
        
        return {
          message: "PDFs organized successfully",
          filename,
          downloadUrl,
        };
      } catch (error: any) {
        throw new Error(
          error?.message || "Failed to organize PDFs. Please ensure all files are valid PDFs."
        );
      }
    },
  });
}