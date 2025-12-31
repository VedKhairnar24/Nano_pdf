import { useCallback, useState, useRef } from "react";
import { FileUp, File as FileIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface DropzoneProps {
  onFileSelect: (file: File | null) => void;
  selectedFile: File | null;
  disabled?: boolean;
}

export function Dropzone({ onFileSelect, selectedFile, disabled }: DropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf") {
        onFileSelect(file);
      } else {
        // Ideally show a toast here, but simple alert for now if needed, 
        // or just ignore non-PDFs silently as per UX patterns
      }
    }
  }, [onFileSelect, disabled]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  }, [onFileSelect]);

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFileSelect(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div
      onClick={() => !selectedFile && inputRef.current?.click()}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "relative w-full h-64 rounded-3xl border-2 border-dashed transition-all duration-300 ease-out flex flex-col items-center justify-center cursor-pointer overflow-hidden group",
        isDragging
          ? "border-primary bg-primary/5 scale-[1.02]"
          : "border-border hover:border-primary/50 hover:bg-slate-50",
        selectedFile ? "border-solid border-primary/20 bg-primary/5 cursor-default h-auto py-8" : "",
        disabled && "opacity-50 cursor-not-allowed hover:border-border hover:bg-transparent"
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        onChange={handleChange}
        className="hidden"
        disabled={disabled || !!selectedFile}
      />

      <AnimatePresence mode="wait">
        {!selectedFile ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col items-center text-center p-6 space-y-4"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
              <FileUp className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Upload your PDF
              </h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-[240px] mx-auto">
                Drag and drop or click to browse files
              </p>
            </div>
            <div className="text-xs font-medium text-primary/60 px-3 py-1 bg-primary/5 rounded-full">
              Maximum file size: 50MB
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="selected"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex items-center w-full max-w-md px-6"
          >
            <div className="relative flex items-center w-full bg-white p-4 rounded-2xl shadow-sm border border-border/50">
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-500 mr-4 shrink-0">
                <FileIcon className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0 mr-4">
                <p className="text-sm font-semibold text-foreground truncate">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              {!disabled && (
                <button
                  onClick={removeFile}
                  className="p-2 rounded-full hover:bg-slate-100 text-muted-foreground hover:text-destructive transition-colors"
                  title="Remove file"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
