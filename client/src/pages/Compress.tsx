import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dropzone } from "@/components/Dropzone";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { StatusCard } from "@/components/StatusCard";
import { Zap, Download, X, FileText } from "lucide-react";
import { useCompressPdf } from "@/hooks/use-compress";
import { useToast } from "@/hooks/use-toast";

export default function Compress() {
  const [file, setFile] = useState<File | null>(null);
  const [compressionLevel, setCompressionLevel] = useState<number[]>([50]);
  
  const { toast } = useToast();
  const compressMutation = useCompressPdf();

  // Clean up blob URLs when component unmounts or mutation resets
  useEffect(() => {
    return () => {
      if (compressMutation.data?.downloadUrl) {
        URL.revokeObjectURL(compressMutation.data.downloadUrl);
      }
    };
  }, [compressMutation.data?.downloadUrl]);

  const handleCompress = () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please upload a PDF file to compress.",
        variant: "destructive",
      });
      return;
    }

    // Clean up previous blob URL if exists
    if (compressMutation.data?.downloadUrl) {
      URL.revokeObjectURL(compressMutation.data.downloadUrl);
    }

    compressMutation.mutate({ file, compressionLevel: compressionLevel[0] });
  };

  const handleReset = () => {
    // Clean up blob URL before resetting
    if (compressMutation.data?.downloadUrl) {
      URL.revokeObjectURL(compressMutation.data.downloadUrl);
    }
    setFile(null);
    setCompressionLevel([50]);
    compressMutation.reset();
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Tool Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 mb-4 bg-white rounded-xl shadow-sm border border-border">
            <Zap className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-3">
            Compress PDF
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-lg mx-auto">
            Reduce PDF file size without losing quality.
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

            {/* Compression Settings */}
            <div className="space-y-4">
              <Label className="text-base font-semibold text-slate-900">
                2. Compression Level
              </Label>
              <div className="space-y-4">
                <Slider
                  value={compressionLevel}
                  onValueChange={setCompressionLevel}
                  max={100}
                  min={10}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Smaller file</span>
                  <span className="font-medium">{compressionLevel[0]}%</span>
                  <span>Better quality</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button 
                onClick={handleCompress}
                disabled={!file || compressMutation.isPending}
                className="flex-1 py-5 text-base rounded-xl font-semibold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:shadow-none disabled:translate-y-0"
              >
                {compressMutation.isPending ? (
                  <span className="flex items-center gap-2">
                    Compressing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Zap className="w-5 h-5 mr-2 fill-current" />
                    Compress PDF
                  </span>
                )}
              </Button>
              <Button
                onClick={handleReset}
                disabled={compressMutation.isPending}
                variant="outline"
                className="px-4 py-5 text-base rounded-xl font-semibold border-2 border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Status Display */}
          <StatusCard 
            status={
              compressMutation.isPending ? "loading" : 
              compressMutation.isSuccess ? "success" : 
              compressMutation.isError ? "error" : "idle"
            }
            message={compressMutation.error?.message}
            downloadUrl={compressMutation.data?.downloadUrl}
            filename={compressMutation.data?.filename}
            onReset={handleReset}
          />
        </Card>

        <div className="mt-8 text-center text-sm text-slate-500">
          All processing happens locally in your browser. Your files stay private.
        </div>
      </div>
    </div>
  );
}