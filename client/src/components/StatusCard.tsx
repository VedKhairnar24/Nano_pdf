import { CheckCircle2, AlertCircle, Loader2, Download } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatusCardProps {
  status: "idle" | "loading" | "success" | "error";
  message?: string;
  downloadUrl?: string;
  filename?: string;
  onReset: () => void;
}

export function StatusCard({ status, message, downloadUrl, filename, onReset }: StatusCardProps) {
  if (status === "idle") return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="w-full overflow-hidden"
    >
      <div className={cn(
        "rounded-2xl p-6 mt-6 border",
        status === "loading" && "bg-blue-50/50 border-blue-100",
        status === "success" && "bg-green-50/50 border-green-100",
        status === "error" && "bg-red-50/50 border-red-100",
      )}>
        <div className="flex items-start gap-4">
          <div className="shrink-0 mt-0.5">
            {status === "loading" && (
              <Loader2 className="w-6 h-6 text-primary animate-spin" />
            )}
            {status === "success" && (
              <CheckCircle2 className="w-6 h-6 text-green-500" />
            )}
            {status === "error" && (
              <AlertCircle className="w-6 h-6 text-red-500" />
            )}
          </div>
          
          <div className="flex-1">
            <h4 className={cn(
              "font-semibold text-sm uppercase tracking-wider mb-1",
              status === "loading" && "text-blue-600",
              status === "success" && "text-green-600",
              status === "error" && "text-red-600",
            )}>
              {status === "loading" && "Processing..."}
              {status === "success" && "Success!"}
              {status === "error" && "Error"}
            </h4>
            
            <p className="text-slate-600 mb-4 leading-relaxed">
              {message || (status === "loading" 
                ? "We are decrypting your PDF. This may take a few moments depending on the file size."
                : status === "success" 
                  ? "Your PDF has been successfully unlocked and is ready for download."
                  : "An unexpected error occurred.")}
            </p>

            {status === "success" && downloadUrl && (
              <div className="flex gap-3">
                <a
                  href={downloadUrl}
                  target="_blank"
                  download={filename || "unlocked.pdf"}
                  className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-green-600/20"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </a>
                <button
                  onClick={onReset}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors"
                >
                  Unlock Another
                </button>
              </div>
            )}
            
            {status === "error" && (
              <button
                onClick={onReset}
                className="px-4 py-2 bg-white border border-red-200 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium transition-colors"
              >
                Try Again
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
