import { motion } from "framer-motion";
import { FileUp, Upload, Download, Lock, Shield, EyeOff } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Upload Your PDF",
      description: "Drag and drop your PDF file or click to browse. All processing happens in your browser.",
      icon: FileUp,
      color: "text-blue-500"
    },
    {
      number: 2,
      title: "Select Processing Options",
      description: "Choose the specific tool and options for your PDF processing needs.",
      icon: Upload,
      color: "text-green-500"
    },
    {
      number: 3,
      title: "Process Securely",
      description: "Our client-side technology processes your file locally without uploading to any server.",
      icon: Shield,
      color: "text-purple-500"
    },
    {
      number: 4,
      title: "Download Result",
      description: "Get your processed PDF file directly in your browser. No storage on our servers.",
      icon: Download,
      color: "text-orange-500"
    }
  ];

  const features = [
    {
      title: "100% Client-Side Processing",
      description: "All operations happen in your browser using advanced web technologies.",
      icon: Lock
    },
    {
      title: "No Data Storage",
      description: "We never store your files on any server. Everything is processed locally.",
      icon: EyeOff
    },
    {
      title: "Instant Processing",
      description: "Get results in seconds without waiting for server uploads/downloads.",
      icon: FileUp
    },
    {
      title: "Secure & Private",
      description: "Your files never leave your device, ensuring complete privacy.",
      icon: Shield
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            How Our PDF Tools Work
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Our advanced client-side technology processes your PDF files directly in your browser, 
            ensuring maximum privacy and security without compromising performance.
          </motion.p>
        </div>

        {/* Process Steps */}
        <div className="mb-20">
          <motion.h2 
            className="text-3xl font-bold text-center text-gray-900 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Simple 4-Step Process
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4 ${step.color}`}>
                  <step.icon className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold text-gray-400 mb-2">{step.number}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Technology Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 mb-20">
          <motion.h2 
            className="text-3xl font-bold text-center text-gray-900 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Advanced Client-Side Technology
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Cutting-Edge PDF Processing</h3>
              <p className="text-gray-600 mb-4">
                Our tools utilize advanced JavaScript libraries like pdf-lib and pdfjs-dist to 
                manipulate PDF files directly in your browser. This eliminates the need for server-side 
                processing and ensures your files remain private.
              </p>
              <p className="text-gray-600 mb-4">
                All operations including unlocking, compressing, organizing, and editing happen 
                entirely on your device. This means faster processing times and complete data privacy.
              </p>
              <p className="text-gray-600">
                Our technology supports all modern browsers and provides a seamless experience 
                regardless of your device or operating system.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Technology Stack</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span>pdf-lib for PDF manipulation</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span>pdfjs-dist for PDF rendering</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  <span>React for user interface</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                  <span>Tailwind CSS for styling</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                  <span>Framer Motion for animations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <motion.h2 
            className="text-3xl font-bold text-center text-gray-900 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Why Client-Side Processing?
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Security Assurance */}
        <motion.div 
          className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Your Privacy is Our Priority</h2>
          <p className="text-lg max-w-2xl mx-auto opacity-90">
            We believe that your documents should remain private and secure. That's why we've built 
            our entire platform to work completely client-side, ensuring that your files never leave 
            your device during processing.
          </p>
          <button className="mt-6 bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-200">
            Learn More About Security
          </button>
        </motion.div>
      </div>
    </div>
  );
}