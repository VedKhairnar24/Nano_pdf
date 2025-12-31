import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dropzone } from "@/components/Dropzone";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { StatusCard } from "@/components/StatusCard";
import { Lock, Download, X, Eye, EyeOff } from "lucide-react";
import { useProtectPdf } from "@/hooks/use-protect";
import { useToast } from "@/hooks/use-toast";

export default function Protect() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { toast } = useToast();
  const protectMutation = useProtectPdf();

  // Clean up blob URLs when component unmounts or mutation resets
  useEffect(() => {
    return () => {
      if (protectMutation.data?.downloadUrl) {
        URL.revokeObjectURL(protectMutation.data.downloadUrl);
      }
    };
  }, [protectMutation.data?.downloadUrl]);

  const handleProtect = () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please upload a PDF file to protect.",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please ensure both passwords are identical.",
        variant: "destructive",
      });
      return;
    }

    if (password.length === 0) {
      toast({
        title: "Password required",
        description: "Please enter a password for the PDF.",
        variant: "destructive",
      });
      return;
    }

    // Clean up previous blob URL if exists
    if (protectMutation.data?.downloadUrl) {
      URL.revokeObjectURL(protectMutation.data.downloadUrl);
    }

    protectMutation.mutate({ file, password });
  };

  const handleReset = () => {
    // Clean up blob URL before resetting
    if (protectMutation.data?.downloadUrl) {
      URL.revokeObjectURL(protectMutation.data.downloadUrl);
    }
    setFile(null);
    setPassword("");
    setConfirmPassword("");
    protectMutation.reset();
  };

  const passwordsMatch = password === confirmPassword && password.length > 0;

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Tool Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 mb-4 bg-white rounded-xl shadow-sm border border-border">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-3">
            Protect PDF
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-lg mx-auto">
            Add password protection to your PDF documents.
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

            {/* Password Input */}
            <div className="space-y-6">
              <div className="space-y-4">
                <Label htmlFor="password" className="text-base font-semibold text-slate-900">
                  2. Set Password
                </Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={!file}
                    className="pl-10 pr-10 py-4 text-base bg-slate-50 border-slate-200 focus:bg-white focus:border-primary transition-all rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={!file}
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

              <div className="space-y-4">
                <Label htmlFor="confirmPassword" className="text-base font-semibold text-slate-900">
                  3. Confirm Password
                </Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={!file}
                    className="pl-10 pr-10 py-4 text-base bg-slate-50 border-slate-200 focus:bg-white focus:border-primary transition-all rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={!file}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 disabled:opacity-50 transition-colors p-1"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {password && confirmPassword && !passwordsMatch && (
                  <p className="text-sm text-red-600">Passwords do not match</p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button 
                onClick={handleProtect}
                disabled={!file || !passwordsMatch || protectMutation.isPending}
                className="flex-1 py-5 text-base rounded-xl font-semibold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:shadow-none disabled:translate-y-0"
              >
                {protectMutation.isPending ? (
                  <span className="flex items-center gap-2">
                    Protecting...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Lock className="w-5 h-5 mr-2 fill-current" />
                    Protect PDF
                  </span>
                )}
              </Button>
              <Button
                onClick={handleReset}
                disabled={protectMutation.isPending}
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
              protectMutation.isPending ? "loading" : 
              protectMutation.isSuccess ? "success" : 
              protectMutation.isError ? "error" : "idle"
            }
            message={protectMutation.error?.message}
            downloadUrl={protectMutation.data?.downloadUrl}
            filename={protectMutation.data?.filename}
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