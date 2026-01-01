import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ToolCard from "@/components/ToolCard";
import { 
  Lock, 
  FileArchive, 
  Shield, 
  Merge, 
  Crop, 
  EyeOff, 
  FileType, 
  Scan, 
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
      icon: <FileArchive className="w-6 h-6 text-primary" />,
      title: "Compress PDF",
      description: "Reduce PDF file size without losing quality",
      href: "/compress"
    },
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: "Protect PDF",
      description: "Add password protection to your PDFs",
      href: "/protect"
    },
    {
      icon: <Merge className="w-6 h-6 text-primary" />,
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
      icon: <FileType className="w-6 h-6 text-primary" />,
      title: "OCR PDF",
      description: "Convert scanned PDFs into searchable documents",
      href: "/ocr"
    },
    {
      icon: <Scan className="w-6 h-6 text-primary" />,
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            All PDF Tools
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive suite of PDF tools helps you manage, edit, and secure your documents with ease. 
            All processing happens locally on your device - your files never leave your computer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

        <div className="mt-20 bg-white rounded-2xl shadow-lg p-8 border border-gray-100 text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Need a different tool?</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            If you need a specific PDF tool that's not listed here, feel free to reach out.
          </p>
          <Link href="mailto:vedkhairnar4@gmail.com">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}