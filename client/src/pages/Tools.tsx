import ToolCard from "../components/ToolCard";
import { 
  Unlock, FileArchive, Shield, Merge, Crop, 
  EyeOff, Scan, FileType, FileDiff 
} from "lucide-react";

export default function Tools() {
  const tools = [
    {
      title: "Unlock PDF",
      description: "Remove password protection from PDF files instantly",
      icon: Unlock,
      href: "/unlock"
    },
    {
      title: "Compress PDF",
      description: "Reduce PDF file size without losing quality",
      icon: FileArchive,
      href: "/compress"
    },
    {
      title: "Protect PDF",
      description: "Add password protection to secure your PDFs",
      icon: Shield,
      href: "/protect"
    },
    {
      title: "Organize PDF",
      description: "Merge, split, and rearrange PDF pages",
      icon: Merge,
      href: "/organize"
    },
    {
      title: "Crop PDF",
      description: "Remove margins and unwanted parts from PDFs",
      icon: Crop,
      href: "/crop"
    },
    {
      title: "Redact PDF",
      description: "Permanently remove sensitive information",
      icon: EyeOff,
      href: "/redact"
    },
    {
      title: "OCR PDF",
      description: "Convert scanned documents to searchable PDFs",
      icon: FileType,
      href: "/ocr"
    },
    {
      title: "Scan to PDF",
      description: "Convert images to PDF documents",
      icon: Scan,
      href: "/scan"
    },
    {
      title: "Compare PDF",
      description: "Compare two PDF files to find differences",
      icon: FileDiff,
      href: "/compare"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            All PDF Tools
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive suite of PDF tools helps you manage, edit, and secure your documents with ease. 
            All processing happens locally on your device - your files never leave your computer.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <ToolCard
              key={index}
              title={tool.title}
              description={tool.description}
              icon={<tool.icon className="w-6 h-6" />}
              href={tool.href}
            />
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-20 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose Our PDF Tools?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Privacy First</h3>
              <p className="text-gray-600">
                All processing happens in your browser. Your files never leave your device.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileType className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Upload Required</h3>
              <p className="text-gray-600">
                Work directly with your files locally. No internet connection needed.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Scan className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast & Efficient</h3>
              <p className="text-gray-600">
                Process your files instantly with our optimized algorithms.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Select any tool above to start processing your PDF files securely and efficiently.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200">
            Explore All Tools
          </button>
        </div>
      </div>
    </div>
  );
}