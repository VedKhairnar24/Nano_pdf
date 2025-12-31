import { useState, useEffect } from "react";
import { useUnlockPdf } from "@/hooks/use-unlock";
import { Dropzone } from "@/components/Dropzone";
import { StatusCard } from "@/components/StatusCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, Zap, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function Unlock() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const { toast } = useToast();
  const unlockMutation = useUnlockPdf();

  // Clean up blob URLs when component unmounts or mutation resets
  useEffect(() => {
    return () => {
      if (unlockMutation.data?.downloadUrl) {
        URL.revokeObjectURL(unlockMutation.data.downloadUrl);
      }
    };
  }, [unlockMutation.data?.downloadUrl]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please upload a PDF file to unlock.",
        variant: "destructive",
      });
      return;
    }

    if (!password) {
      toast({
        title: "Password required",
        description: "Please enter the password for this PDF.",
        variant: "destructive",
      });
      return;
    }

    // Clean up previous blob URL if exists
    if (unlockMutation.data?.downloadUrl) {
      URL.revokeObjectURL(unlockMutation.data.downloadUrl);
    }

    // Clear password from memory after a short delay for security
    // Note: Password is already cleared from input via handleReset
    unlockMutation.mutate({ file, password });
  };

  const handleReset = () => {
    // Clean up blob URL before resetting
    if (unlockMutation.data?.downloadUrl) {
      URL.revokeObjectURL(unlockMutation.data.downloadUrl);
    }
    setFile(null);
    setPassword(""); // Clear password from state
    unlockMutation.reset();
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Tool Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-3 mb-4 bg-white rounded-xl shadow-sm border border-border">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-3">
            Unlock PDF
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-lg mx-auto">
            Remove password protection from your PDF documents securely.
          </p>
          <p className="text-sm text-slate-500 mt-2">
            All processing happens locally in your browser.
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 md:p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: File Upload */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base font-semibold text-slate-900">
                  1. Upload Protected PDF
                </Label>
              </div>
              <Dropzone 
                onFileSelect={(f) => {
                  setFile(f);
                  unlockMutation.reset();
                }}
                selectedFile={file}
                disabled={unlockMutation.isPending}
              />
            </div>

            {/* Step 2: Password Input */}
            <div className="space-y-4">
              <Label htmlFor="password" className="text-base font-semibold text-slate-900">
                2. Enter Password
              </Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="• • • • • • • •"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={!file || unlockMutation.isPending}
                  className="pl-10 pr-10 py-4 text-base bg-slate-50 border-slate-200 focus:bg-white focus:border-primary transition-all rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={!file || unlockMutation.isPending}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 disabled:opacity-50 transition-colors p-1"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex gap-3">
              <Button
                type="submit"
                disabled={!file || !password || unlockMutation.isPending}
                className="flex-1 py-5 text-base rounded-xl font-semibold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:shadow-none disabled:translate-y-0"
              >
                {unlockMutation.isPending ? (
                  <span className="flex items-center gap-2">
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Zap className="w-5 h-5 fill-current" />
                    Unlock PDF
                  </span>
                )}
              </Button>
              <Button
                type="button"
                onClick={handleReset}
                disabled={unlockMutation.isPending}
                variant="outline"
                className="px-4 py-5 text-base rounded-xl font-semibold border-2 border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </form>

          {/* Status Display */}
          <StatusCard 
            status={
              unlockMutation.isPending ? "loading" : 
              unlockMutation.isSuccess ? "success" : 
              unlockMutation.isError ? "error" : "idle"
            }
            message={unlockMutation.error?.message}
            downloadUrl={unlockMutation.data?.downloadUrl}
            filename={unlockMutation.data?.filename}
            onReset={handleReset}
          />
        </motion.div>

        <div className="mt-8 text-center text-sm text-slate-500">
          All processing happens locally in your browser. Your files stay private.
        </div>
      </div>
    </div>
  );
}