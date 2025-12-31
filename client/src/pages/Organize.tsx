import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dropzone } from "@/components/Dropzone";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { FileEdit, Download, X, FileText } from "lucide-react";

export default function Organize() {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileSelect = (file: File | null) => {
    if (file) {
      setFiles([...files, file]);
    }
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleOrganize = () => {
    // TODO: Implement PDF organization functionality
    console.log("Organizing files:", files);
  };

  const handleReset = () => {
    setFiles([]);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Tool Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 mb-4 bg-white rounded-xl shadow-sm border border-border">
            <FileEdit className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-3">
            Organize PDF
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-lg mx-auto">
            Reorder, delete, or merge PDF pages.
          </p>
          <p className="text-sm text-slate-500 mt-2">
            All processing happens locally in your browser.
          </p>
        </div>

        {/* Main Card */}
        <Card className="w-full shadow-xl shadow-slate-200/50 border border-slate-100 p-6 md:p-8">
          <div className="space-y-8">
            {/* File Upload */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base font-semibold text-slate-900">
                  1. Upload PDF Files
                </Label>
              </div>
              
              {files.length === 0 ? (
                <Dropzone 
                  onFileSelect={handleFileSelect}
                  selectedFile={null}
                />
              ) : (
                <div className="space-y-4">
                  <Dropzone 
                    onFileSelect={handleFileSelect}
                    selectedFile={null}
                  />
                  
                  <div className="mt-4 space-y-2">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-primary" />
                          <span className="text-sm font-medium truncate max-w-xs">{file.name}</span>
                          <span className="text-xs text-slate-500">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveFile(index)}
                          className="h-8 w-8 p-0"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button 
                onClick={handleOrganize}
                disabled={files.length === 0}
                className="flex-1 py-5 text-base rounded-xl font-semibold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:shadow-none disabled:translate-y-0"
              >
                <FileEdit className="w-5 h-5 mr-2 fill-current" />
                Organize PDFs
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="px-4 py-5 text-base rounded-xl font-semibold border-2 border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Result Area */}
          {files.length > 0 && (
            <div className="mt-8 pt-8 border-t border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Result</h3>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-primary" />
                  <div>
                    <p className="font-medium text-slate-900">organized.pdf</p>
                    <p className="text-sm text-slate-600">Ready to download</p>
                  </div>
                </div>
                <Button>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          )}
        </Card>

        <div className="mt-8 text-center text-sm text-slate-500">
          All processing happens locally in your browser. Your files stay private.
        </div>
      </div>
    </div>
  );
}