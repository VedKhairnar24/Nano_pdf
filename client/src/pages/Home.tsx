import { useState } from "react";
import { useUnlockPdf } from "@/hooks/use-unlock";
import { Dropzone } from "@/components/Dropzone";
import { StatusCard } from "@/components/StatusCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, ShieldCheck, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const { toast } = useToast();
  const unlockMutation = useUnlockPdf();

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

    const formData = new FormData();
    formData.append("file", file);
    formData.append("password", password);

    unlockMutation.mutate(formData);
  };

  const handleReset = () => {
    setFile(null);
    setPassword("");
    unlockMutation.reset();
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Abstract Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12 md:py-20 flex flex-col items-center">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-3 mb-6 bg-white rounded-2xl shadow-sm border border-border">
            <ShieldCheck className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
            PDF Password Remover
          </h1>
          <p className="text-lg text-slate-500 max-w-lg mx-auto leading-relaxed">
            Securely remove passwords from your PDF documents. <br className="hidden md:block"/>
            Fast, private, and client-side focused.
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-2xl bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 md:p-8"
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
                  className="pl-10 pr-10 py-6 text-lg bg-slate-50 border-slate-200 focus:bg-white focus:border-primary transition-all rounded-xl"
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

            {/* Action Button */}
            <div className="pt-2">
              <Button
                type="submit"
                disabled={!file || !password || unlockMutation.isPending}
                className="w-full py-7 text-lg rounded-xl font-semibold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:shadow-none disabled:translate-y-0"
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
            onReset={handleReset}
          />
        </motion.div>

        {/* Footer info */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center w-full max-w-3xl"
        >
          <div className="p-4">
            <h3 className="font-semibold text-slate-900 mb-2">Secure</h3>
            <p className="text-sm text-slate-500">Files are processed securely and deleted automatically after processing.</p>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-slate-900 mb-2">Fast</h3>
            <p className="text-sm text-slate-500">Powerful python backend decrypts your files in seconds.</p>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-slate-900 mb-2">Free</h3>
            <p className="text-sm text-slate-500">No hidden costs, watermarks, or limitations on file size.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
