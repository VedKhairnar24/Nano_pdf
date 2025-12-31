import { useState, useEffect } from "react";
import { useUnlockPdf } from "@/hooks/use-unlock";
import { Dropzone } from "@/components/Dropzone";
import { StatusCard } from "@/components/StatusCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, ShieldCheck, Zap, Github, Globe, Linkedin, Mail, User, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function Home() {
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
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Abstract Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[350px] h-[350px] md:w-[600px] md:h-[600px] bg-blue-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12 md:py-20 flex flex-col items-center">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-2 md:p-3 mb-4 md:mb-6 bg-white rounded-xl md:rounded-2xl shadow-sm border border-border">
            <ShieldCheck className="w-6 h-6 md:w-8 md:h-8 text-primary" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-3 md:mb-4 px-2">
            PDF Password Remover
          </h1>
          <p className="text-base sm:text-lg text-slate-500 max-w-lg mx-auto leading-relaxed px-4">
            Securely remove passwords from your PDF documents. <br className="hidden md:block"/>
            Fast, private, and completely offline - all processing happens in your browser.
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-2xl bg-white rounded-2xl md:rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-4 sm:p-6 md:p-8"
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
                  className="pl-10 pr-10 py-4 md:py-6 text-base md:text-lg bg-slate-50 border-slate-200 focus:bg-white focus:border-primary transition-all rounded-xl"
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
                className="flex-1 py-5 md:py-7 text-base md:text-lg rounded-xl font-semibold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:shadow-none disabled:translate-y-0"
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
                className="px-4 md:px-6 py-5 md:py-7 text-base md:text-lg rounded-xl font-semibold border-2 border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 disabled:opacity-50"
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

        {/* Footer info */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-center w-full max-w-3xl px-4"
        >
          <div className="p-4">
            <h3 className="font-semibold text-slate-900 mb-2">Secure</h3>
            <p className="text-sm text-slate-500">All processing happens locally in your browser. Your files never leave your device.</p>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-slate-900 mb-2">Fast</h3>
            <p className="text-sm text-slate-500">Client-side processing decrypts your files quickly without server delays.</p>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-slate-900 mb-2">Private</h3>
            <p className="text-sm text-slate-500">No uploads, no servers, no data storage. Complete privacy guaranteed.</p>
          </div>
        </motion.div>

        {/* Developer Information Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 w-full max-w-2xl"
        >
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100 p-6 md:p-8">
            <div className="flex items-center justify-center mb-4 md:mb-6">
              <div className="relative">
                <img 
                  src="/img/Dev pic.png" 
                  alt="Ved Khairnar" 
                  className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] rounded-full object-cover border-4 border-primary/20 shadow-lg"
                />
              </div>
            </div>
            
            <div className="text-center mb-4 md:mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">Ved Khairnar</h2>
              <p className="text-sm md:text-base text-slate-600 mb-1">TY B.Tech (Computer Science & Engineering)</p>
              <p className="text-xs md:text-sm text-slate-500 italic mt-3 px-2">
                "Building simple, smart, and useful technology for everyone."
              </p>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mt-6 md:mt-8">
              <a
                href="https://github.com/VedKhairnar24"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors text-slate-700 hover:text-slate-900 text-xs md:text-sm"
              >
                <Github className="w-4 h-4" />
                <span className="text-sm font-medium">GitHub</span>
              </a>
              
              <a
                href="https://vedkhairnar.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors text-slate-700 hover:text-slate-900 text-xs md:text-sm"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">Portfolio</span>
              </a>
              
              <a
                href="https://www.linkedin.com/in/ved-khairnar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors text-slate-700 hover:text-slate-900 text-xs md:text-sm"
              >
                <Linkedin className="w-4 h-4" />
                <span className="text-sm font-medium">LinkedIn</span>
              </a>
              
              <a
                href="mailto:khairnarved7@gmail.com"
                className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors text-slate-700 hover:text-slate-900 text-xs md:text-sm"
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm font-medium">Email</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-slate-500">
            © 2024 PDF Unlocker - <span className="font-medium text-slate-700">by ved khairnar</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
