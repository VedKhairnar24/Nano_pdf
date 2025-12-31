import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { StatusCard } from "@/components/StatusCard";
import { Camera, Download, X, FileText } from "lucide-react";
import { useScanPdf } from "@/hooks/use-scan";
import { useToast } from "@/hooks/use-toast";

export default function Scan() {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  
  const { toast } = useToast();
  const scanMutation = useScanPdf();

  // Clean up blob URLs when component unmounts or mutation resets
  useEffect(() => {
    return () => {
      if (scanMutation.data?.downloadUrl) {
        URL.revokeObjectURL(scanMutation.data.downloadUrl);
      }
    };
  }, [scanMutation.data?.downloadUrl]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      setImageFiles(prev => [...prev, ...files]);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newFiles = [...imageFiles];
    newFiles.splice(index, 1);
    setImageFiles(newFiles);
  };

  const handleScan = () => {
    if (imageFiles.length === 0) {
      toast({
        title: "No images selected",
        description: "Please upload at least one image to create a PDF.",
        variant: "destructive",
      });
      return;
    }

    // Clean up previous blob URL if exists
    if (scanMutation.data?.downloadUrl) {
      URL.revokeObjectURL(scanMutation.data.downloadUrl);
    }

    scanMutation.mutate({ imageFiles });
  };

  const handleReset = () => {
    // Clean up blob URL before resetting
    if (scanMutation.data?.downloadUrl) {
      URL.revokeObjectURL(scanMutation.data.downloadUrl);
    }
    setImageFiles([]);
    scanMutation.reset();
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Tool Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 mb-4 bg-white rounded-xl shadow-sm border border-border">
            <Camera className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-3">
            Scan to PDF
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-lg mx-auto">
            Create PDFs from images or camera scans.
          </p>
          <p className="text-sm text-slate-500 mt-2">
            All processing happens locally in your browser.
          </p>
        </div>

        {/* Main Card */}
        <Card className="w-full shadow-xl shadow-slate-200/50 border border-slate-100 p-6 md:p-8">
          <div className="space-y-8">
            {/* Image Upload */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base font-semibold text-slate-900">
                  1. Upload Images
                </Label>
              </div>
              
              <div className="border-2 border-dashed border-slate-300 rounded-3xl p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-slate-50 transition-all"
                onClick={() => document.getElementById('image-upload')?.click()}>
                <input
                  id="image-upload"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Camera className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-slate-700 mb-1">Upload images</p>
                <p className="text-sm text-slate-500">Select JPG, PNG or other image formats</p>
              </div>
              
              {imageFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  {imageFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-primary" />
                        <span className="text-sm font-medium truncate max-w-xs">{file.name}</span>
                        <span className="text-xs text-slate-500">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveImage(index)}
                        className="h-8 w-8 p-0"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button 
                onClick={handleScan}
                disabled={imageFiles.length === 0 || scanMutation.isPending}
                className="flex-1 py-5 text-base rounded-xl font-semibold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:shadow-none disabled:translate-y-0"
              >
                {scanMutation.isPending ? (
                  <span className="flex items-center gap-2">
                    Creating...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Camera className="w-5 h-5 mr-2 fill-current" />
                    Create PDF
                  </span>
                )}
              </Button>
              <Button
                onClick={handleReset}
                disabled={scanMutation.isPending}
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
              scanMutation.isPending ? "loading" : 
              scanMutation.isSuccess ? "success" : 
              scanMutation.isError ? "error" : "idle"
            }
            message={scanMutation.error?.message}
            downloadUrl={scanMutation.data?.downloadUrl}
            filename={scanMutation.data?.filename}
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