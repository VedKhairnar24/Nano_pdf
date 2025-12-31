import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dropzone } from "@/components/Dropzone";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { EyeOff, Download, X, FileText } from "lucide-react";

export default function Redact() {
  const [file, setFile] = useState<File | null>(null);

  const handleRedact = () => {
    // TODO: Implement PDF redaction functionality
    console.log("Redacting file:", file);
  };

  const handleReset = () => {
    setFile(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Tool Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 mb-4 bg-white rounded-xl shadow-sm border border-border">
            <EyeOff className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-3">
            Redact PDF
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-lg mx-auto">
            Permanently remove sensitive text and graphics.
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
                  1. Upload PDF File
                </Label>
              </div>
              <Dropzone 
                onFileSelect={setFile}
                selectedFile={file}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button 
                onClick={handleRedact}
                disabled={!file}
                className="flex-1 py-5 text-base rounded-xl font-semibold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:shadow-none disabled:translate-y-0"
              >
                <EyeOff className="w-5 h-5 mr-2 fill-current" />
                Redact PDF
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
          {file && (
            <div className="mt-8 pt-8 border-t border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Result</h3>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-primary" />
                  <div>
                    <p className="font-medium text-slate-900">{file.name}</p>
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