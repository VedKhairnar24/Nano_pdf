import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useUnlockPdf } from "@/hooks/use-unlock";
import { Dropzone } from "@/components/Dropzone";
import { StatusCard } from "@/components/StatusCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ToolCard from "@/components/ToolCard";
import { Eye, EyeOff, Lock, ShieldCheck, Zap, Github, Globe, Linkedin, Mail, User, X, FileDown, FileEdit, Crop, EyeOff as EyeOffIcon, ScanText, Camera, FileDiff, CheckCircle, CloudOff, Lock as LockIcon, FileText, ArrowRight, Download } from "lucide-react";
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

  const tools = [
    {
      icon: <Lock className="w-6 h-6 text-primary" />,
      title: "Unlock PDF",
      description: "Remove password protection from PDF files",
      href: "/unlock"
    },
    {
      icon: <FileDown className="w-6 h-6 text-primary" />,
      title: "Compress PDF",
      description: "Reduce PDF file size without losing quality",
      href: "/compress"
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-primary" />,
      title: "Protect PDF",
      description: "Add password protection to your PDFs",
      href: "/protect"
    },
    {
      icon: <FileEdit className="w-6 h-6 text-primary" />,
      title: "Organize PDF",
      description: "Reorder, delete, or merge PDF pages",
      href: "/organize"
    },
    {
      icon: <Crop className="w-6 h-6 text-primary" />,
      title: "Crop PDF",
      description: "Trim margins or selected areas of PDF pages",
      href: "/crop"
    },
    {
      icon: <EyeOffIcon className="w-6 h-6 text-primary" />,
      title: "Redact PDF",
      description: "Permanently remove sensitive text and graphics",
      href: "/redact"
    },
    {
      icon: <ScanText className="w-6 h-6 text-primary" />,
      title: "OCR PDF",
      description: "Convert scanned PDFs into searchable documents",
      href: "/ocr"
    },
    {
      icon: <Camera className="w-6 h-6 text-primary" />,
      title: "Scan to PDF",
      description: "Create PDFs from images or camera scans",
      href: "/scan"
    },
    {
      icon: <FileDiff className="w-6 h-6 text-primary" />,
      title: "Compare PDF",
      description: "Find differences between two PDF files",
      href: "/compare"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Abstract Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[350px] h-[350px] md:w-[600px] md:h-[600px] bg-blue-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto px-4 py-16 md:py-24 flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-4 px-2">
              Simple PDF tools. Right in your browser.
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed px-4">
              Unlock, compress, protect, and edit PDF files securely. <br className="hidden md:block"/>
              No uploads. No servers. No data storage.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <Link href="/unlock">
              <Button size="lg" className="px-8 py-6 text-lg rounded-xl font-semibold">
                Unlock PDF
              </Button>
            </Link>
            <Link href="/all-tools">
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg rounded-xl font-semibold border-2 border-slate-200 hover:bg-slate-50">
                View All Tools
              </Button>
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center items-center gap-6 md:gap-8 text-slate-600"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm">100% Client-Side</span>
            </div>
            <div className="flex items-center gap-2">
              <CloudOff className="w-5 h-5 text-amber-500" />
              <span className="text-sm">Works Offline</span>
            </div>
            <div className="flex items-center gap-2">
              <Download className="w-5 h-5 text-blue-500" />
              <span className="text-sm">No File Uploads</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <span className="text-sm">Privacy First</span>
            </div>
          </motion.div>
        </div>

        {/* Services / Tools Section */}
        <div id="tools" className="w-full bg-[#F8FAFC] py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                All PDF tools you need, in one place
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Everything you need to work with PDF files, all in your browser.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool, index) => (
                <ToolCard 
                  key={index}
                  icon={tool.icon}
                  title={tool.title}
                  description={tool.description}
                  href={tool.href}
                />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/all-tools">
                <Button variant="outline" size="lg" className="px-6 py-3 rounded-xl font-medium">
                  View All Tools
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div id="how-it-works" className="py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                How it works
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                No uploads. No servers. Your files stay private.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-center p-6"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                  <FileText className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Select your PDF</h3>
                <p className="text-slate-600">
                  Choose a PDF file directly from your device. No upload required.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center p-6"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                  <Zap className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Process locally</h3>
                <p className="text-slate-600">
                  All processing happens in your browser using client-side JavaScript.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-center p-6"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                  <Download className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Download instantly</h3>
                <p className="text-slate-600">
                  Get your processed PDF immediately. No server storage or tracking.
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Privacy & Security Section */}
        <div id="security" className="w-full bg-[#F8FAFC] py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Your privacy comes first
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                We take your privacy seriously. Your files are never uploaded to any server.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <ShieldCheck className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">Files never leave your device</h3>
                    <p className="text-slate-600">
                      All processing happens in your browser. Your files never leave your device.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <LockIcon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">No backend servers involved</h3>
                    <p className="text-slate-600">
                      There are no servers involved in the PDF processing. Everything is client-side.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">No user accounts or logins</h3>
                    <p className="text-slate-600">
                      No registration required. No personal information collected.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <EyeOffIcon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">No tracking or analytics</h3>
                    <p className="text-slate-600">
                      We don't track your usage or collect analytics data.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">No file or password storage</h3>
                    <p className="text-slate-600">
                      We never store your files or passwords on any server.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Offline & Performance Section */}
        <div className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Fast. Offline. Reliable.
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Works even without internet, optimized for modern browsers.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 bg-slate-50 rounded-xl">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                  <CloudOff className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Works Offline</h3>
                <p className="text-sm text-slate-600">Use our tools even without an internet connection.</p>
              </div>

              <div className="p-6 bg-slate-50 rounded-xl">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-4">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Optimized</h3>
                <p className="text-sm text-slate-600">Lightweight and fast processing for modern browsers.</p>
              </div>

              <div className="p-6 bg-slate-50 rounded-xl">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 text-amber-600 mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Reliable</h3>
                <p className="text-sm text-slate-600">Trusted by thousands for secure PDF processing.</p>
              </div>

              <div className="p-6 bg-slate-50 rounded-xl">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 text-purple-600 mb-4">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Responsive</h3>
                <p className="text-sm text-slate-600">Designed for desktop and mobile devices.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Card - PDF Unlocker */}
        <div className="max-w-4xl mx-auto px-4 py-16 md:py-24 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full max-w-2xl mx-auto bg-white rounded-2xl md:rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-4 sm:p-6 md:p-8"
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
        </div>

        {/* About / Developer Section */}
        <div id="about" className="w-full bg-[#F8FAFC] py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl md:rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100 p-6 md:p-8"
            >
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                <div className="flex-shrink-0">
                  <img 
                    src="/img/Dev pic.png" 
                    alt="Ved Khairnar" 
                    className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] rounded-full object-cover border-4 border-primary/20 shadow-lg"
                  />
                </div>
                
                <div className="text-center md:text-left flex-grow">
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">Ved Khairnar</h2>
                  <p className="text-sm md:text-base text-slate-600 mb-1">TY B.Tech (Computer Science & Engineering)</p>
                  <p className="text-xs md:text-sm text-slate-500 italic mt-3 px-2">
                    "Building simple, smart, and useful technology for everyone."
                  </p>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 md:gap-4 mt-6 md:mt-8">
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
                  href="https://dev-ved-khairnar.web.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors text-slate-700 hover:text-slate-900 text-xs md:text-sm"
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-sm font-medium">Portfolio</span>
                </a>
                
                <a
                  href="https://www.linkedin.com/in/ved-khairnar-193889355"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors text-slate-700 hover:text-slate-900 text-xs md:text-sm"
                >
                  <Linkedin className="w-4 h-4" />
                  <span className="text-sm font-medium">LinkedIn</span>
                </a>
                
                <a
                  href="mailto:vedkhairnar4@gmail.com"
                  className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors text-slate-700 hover:text-slate-900 text-xs md:text-sm"
                >
                  <Mail className="w-4 h-4" />
                  <span className="text-sm font-medium">Email</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
