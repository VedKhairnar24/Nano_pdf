import { motion } from "framer-motion";
import { Shield, Lock, EyeOff, ServerOff, Key, CheckCircle, AlertTriangle, Zap } from "lucide-react";

export default function Security() {
  const securityFeatures = [
    {
      title: "Zero Data Storage",
      description: "We never store your files on any server. All processing happens locally in your browser.",
      icon: ServerOff,
      color: "text-red-500"
    },
    {
      title: "End-to-End Encryption",
      description: "Your files are processed using client-side encryption with no data transmission.",
      icon: Lock,
      color: "text-blue-500"
    },
    {
      title: "Complete Privacy",
      description: "Your documents never leave your device during processing - total privacy guaranteed.",
      icon: EyeOff,
      color: "text-purple-500"
    },
    {
      title: "Open Source Technology",
      description: "Our tools use open-source libraries that you can verify and trust.",
      icon: Key,
      color: "text-green-500"
    }
  ];

  const privacyPractices = [
    "No file uploads to external servers",
    "No user account creation required",
    "No tracking or analytics on file processing",
    "No data collection or storage",
    "No cookies for tracking purposes",
    "All processing happens in your browser",
    "No logs of your activity",
    "No third-party integrations during processing"
  ];

  const compliance = [
    "GDPR Compliant",
    "CCPA Compliant", 
    "No data processing outside your device",
    "No user data collection",
    "Transparent privacy policy"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div 
            className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Shield className="w-10 h-10 text-blue-600" />
          </motion.div>
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Security & Privacy First
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Your documents and privacy are our top priority. We've built our platform with security-first 
            principles to ensure your files remain completely private and secure.
          </motion.p>
        </div>

        {/* Security Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={`w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4 ${feature.color}`}>
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* How We Protect You */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 mb-20">
          <motion.h2 
            className="text-3xl font-bold text-center text-gray-900 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            How We Protect Your Documents
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                What We Do
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span>Process all files directly in your browser using client-side technology</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span>Never upload your files to any external server</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span>Use advanced JavaScript libraries for PDF processing</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span>Provide immediate results without data transmission</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                What We Don't Do
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span>Store your files on any server or database</span>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span>Share your documents with third parties</span>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span>Track or log your file processing activities</span>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span>Collect personal information during file processing</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Privacy Practices */}
        <div className="mb-20">
          <motion.h2 
            className="text-3xl font-bold text-center text-gray-900 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Our Privacy Practices
          </motion.h2>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 max-w-4xl mx-auto">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {privacyPractices.map((practice, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{practice}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Compliance Section */}
        <div className="mb-16">
          <motion.h2 
            className="text-3xl font-bold text-center text-gray-900 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Compliance & Standards
          </motion.h2>
          
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {compliance.map((item, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Assurance */}
        <motion.div 
          className="bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl p-8 text-white text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          <Zap className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Built for Trust</h2>
          <p className="text-lg max-w-2xl mx-auto opacity-90">
            Our commitment to security and privacy isn't just a policy - it's the foundation 
            of our entire platform. We've designed every feature to ensure your documents 
            remain completely under your control.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-green-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition duration-200">
              View Privacy Policy
            </button>
            <button className="bg-transparent border-2 border-white text-white font-semibold py-3 px-6 rounded-lg hover:bg-white/10 transition duration-200">
              Learn More
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}