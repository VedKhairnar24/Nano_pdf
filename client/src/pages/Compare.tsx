import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dropzone } from "@/components/Dropzone";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { StatusCard } from "@/components/StatusCard";
import { FileDiff, Download, X, FileText } from "lucide-react";
import { useComparePdf } from "@/hooks/use-compare";
import { useToast } from "@/hooks/use-toast";

export default function Compare() {
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  
  const { toast } = useToast();
  const compareMutation = useComparePdf();

  // Clean up blob URLs when component unmounts or mutation resets
  useEffect(() => {
    return () => {
      if (compareMutation.data?.downloadUrl) {
        URL.revokeObjectURL(compareMutation.data.downloadUrl);
      }
    };
  }, [compareMutation.data?.downloadUrl]);

  const handleCompare = () => {
    if (!file1 || !file2) {
      toast({
        title: "Missing files",
        description: "Please upload both PDF files to compare.",
        variant: "destructive",
      });
      return;
    }

    // Clean up previous blob URL if exists
    if (compareMutation.data?.downloadUrl) {
      URL.revokeObjectURL(compareMutation.data.downloadUrl);
    }

    compareMutation.mutate({ file1, file2 });
  };

  const handleReset = () => {
    // Clean up blob URL before resetting
    if (compareMutation.data?.downloadUrl) {
      URL.revokeObjectURL(compareMutation.data.downloadUrl);
    }
    setFile1(null);
    setFile2(null);
    compareMutation.reset();
  };

  const canCompare = file1 && file2;

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Tool Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 mb-4 bg-white rounded-xl shadow-sm border border-border">
            <FileDiff className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-3">
            Compare PDF
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-lg mx-auto">
            Find differences between two PDF files.
          </p>
          <p className="text-sm text-slate-500 mt-2">
            All processing happens locally in your browser.
          </p>
        </div>

        {/* Main Card */}
        <Card className="w-full shadow-xl shadow-slate-200/50 border border-slate-100 p-6 md:p-8">
          <div className="space-y-8">
            {/* File Uploads */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-semibold text-slate-900">
                    1. Upload First PDF
                  </Label>
                </div>
                <Dropzone 
                  onFileSelect={setFile1}
                  selectedFile={file1}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-semibold text-slate-900">
                    2. Upload Second PDF
                  </Label>
                </div>
                <Dropzone 
                  onFileSelect={setFile2}
                  selectedFile={file2}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button 
                onClick={handleCompare}
                disabled={!canCompare || compareMutation.isPending}
                className="flex-1 py-5 text-base rounded-xl font-semibold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:shadow-none disabled:translate-y-0"
              >
                {compareMutation.isPending ? (
                  <span className="flex items-center gap-2">
                    Comparing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <FileDiff className="w-5 h-5 mr-2 fill-current" />
                    Compare PDFs
                  </span>
                )}
              </Button>
              <Button
                onClick={handleReset}
                disabled={compareMutation.isPending}
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
              compareMutation.isPending ? "loading" : 
              compareMutation.isSuccess ? "success" : 
              compareMutation.isError ? "error" : "idle"
            }
            message={compareMutation.error?.message}
            downloadUrl={compareMutation.data?.downloadUrl}
            filename={compareMutation.data?.filename}
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