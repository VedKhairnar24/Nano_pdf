import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ToolCard from "@/components/ToolCard";
import { 
  Lock, 
  FileDown, 
  ShieldCheck, 
  FileEdit, 
  Crop, 
  EyeOff, 
  ScanText, 
  Camera, 
  FileDiff 
} from "lucide-react";

export default function AllTools() {
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
      icon: <EyeOff className="w-6 h-6 text-primary" />,
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
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
            All PDF Tools
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
            All the PDF tools you need, in one place. No uploads. No servers. Your files stay private.
          </p>
        </div>

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

        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-4">Need a different tool?</h3>
              <p className="text-slate-600 mb-6">
                If you need a specific PDF tool that's not listed here, feel free to reach out.
              </p>
              <Link href="mailto:vedkhairnar4@gmail.com">
                <Button>Contact Us</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}