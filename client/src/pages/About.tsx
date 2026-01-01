import { motion } from "framer-motion";
import { Users, Award, Heart, Code, Shield, Globe } from "lucide-react";

export default function About() {
  const missionItems = [
    {
      title: "Privacy First",
      description: "We believe your documents should remain private and never leave your device",
      icon: Shield
    },
    {
      title: "Accessibility",
      description: "Making powerful PDF tools available to everyone, everywhere",
      icon: Globe
    },
    {
      title: "Open Innovation",
      description: "Using open-source technology to create transparent and trustworthy tools",
      icon: Code
    },
    {
      title: "User-Centric",
      description: "Designing with the user experience as our top priority",
      icon: Heart
    }
  ];

  const stats = [
    { value: "100%", label: "Client-Side Processing" },
    { value: "0", label: "Files Stored" },
    { value: "9+", label: "PDF Tools" },
    { value: "24/7", label: "Availability" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div 
            className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Users className="w-12 h-12 text-white" />
          </motion.div>
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            About PDF Toolkit
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            We're on a mission to provide powerful, privacy-focused PDF tools that work entirely in your browser. 
            No uploads, no accounts, no data sharing - just secure, efficient PDF processing.
          </motion.p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Our Mission */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 mb-20">
          <motion.h2 
            className="text-3xl font-bold text-center text-gray-900 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Our Mission
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-600 mb-6 text-lg">
                In a world where digital privacy is increasingly important, we believe that handling 
                sensitive documents should not require sacrificing security. Our mission is to provide 
                powerful PDF tools that work entirely in your browser, ensuring your documents never 
                leave your device.
              </p>
              <p className="text-gray-600 mb-6 text-lg">
                We're committed to building tools that are not only functional but also respect your 
                privacy and data. Every feature we develop is guided by our core principle: your files 
                should remain yours.
              </p>
              <div className="flex items-center text-blue-600 font-semibold">
                <Award className="w-5 h-5 mr-2" />
                <span>Trusted by thousands of users worldwide</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Our Core Values</h3>
              <ul className="space-y-4">
                {missionItems.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <item.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Technology & Approach */}
        <div className="mb-20">
          <motion.h2 
            className="text-3xl font-bold text-center text-gray-900 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Our Technology & Approach
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Code className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Client-Side Processing</h3>
              <p className="text-gray-600">
                All PDF operations happen directly in your browser using advanced JavaScript libraries. 
                This ensures maximum privacy and security.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Privacy Guaranteed</h3>
              <p className="text-gray-600">
                Your files never leave your device. We don't store, upload, or process your documents 
                on any server.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Accessible Anywhere</h3>
              <p className="text-gray-600">
                Our tools work on any modern browser across desktop and mobile devices, 
                with no installation required.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Team Values */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <Heart className="w-12 h-12 mx-auto mb-6 text-white" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Built with Purpose</h2>
            <p className="text-lg max-w-2xl mx-auto opacity-90 mb-6">
              We're not just building tools - we're creating a more secure and private way 
              to handle your important documents. Every line of code is written with your 
              privacy and security in mind.
            </p>
            <button className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-200">
              Join Our Community
            </button>
          </div>
        </div>
        
        {/* Developer Info Section */}
        <div className="mt-20 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <motion.h2 
            className="text-3xl font-bold text-center text-gray-900 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            Meet the Developer
          </motion.h2>
          
          <div className="flex flex-col items-center gap-6">
            <div className="flex-shrink-0">
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img 
                  src="/img/Dev pic.png" 
                  alt="Ved Khairnar" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='192' height='192' fill='%23999' viewBox='0 0 24 24'%3E%3Cpath d='M12 14a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0-8a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 14.2a7.2 7.2 0 0 0-6-3.22c0-1.48.5-2.89 1.38-3.98A6.95 6.95 0 0 1 6 12a7 7 0 0 1 14 0 6.95 6.95 0 0 1-1.38 4.01c.88 1.09 1.38 2.5 1.38 3.98a7.2 7.2 0 0 0-6 3.22z'/%3E%3C/svg%3E";
                  }}
                />
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Ved Khairnar</h3>
              <p className="text-lg text-gray-600 mb-4">Full Stack Developer & Computer Science Engineer</p>
              
              <div className="mb-6 max-w-2xl mx-auto">
                <p className="text-gray-700 mb-4">
                  I'm a passionate developer specializing in creating intuitive, privacy-focused applications 
                  that solve real-world problems. With a strong background in Computer Science & Engineering, 
                  I focus on building solutions that prioritize user privacy and security.
                </p>
                <p className="text-gray-700">
                  My approach combines technical excellence with user-centered design, ensuring that complex 
                  functionality remains accessible to everyone. I believe in the power of open technology 
                  and the importance of digital privacy rights.
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="https://github.com/VedKhairnar24"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.602-3.369-1.34-3.369-1.34-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">GitHub</span>
                </a>
                
                <a
                  href="https://dev-ved-khairnar.web.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700"
                >
                  <Globe className="w-5 h-5" />
                  <span className="font-medium">Portfolio</span>
                </a>
                
                <a
                  href="https://www.linkedin.com/in/ved-khairnar-193889355"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span className="font-medium">LinkedIn</span>
                </a>
                
                <a
                  href="mailto:vedkhairnar4@gmail.com"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">Email</span>
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">My Technical Expertise</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-1">Frontend</div>
                <div className="text-sm text-gray-600">React, TypeScript, Tailwind CSS</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-1">Backend</div>
                <div className="text-sm text-gray-600">Node.js, Express, Python</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-1">PDF Tech</div>
                <div className="text-sm text-gray-600">pdf-lib, pdfjs-dist</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600 mb-1">Security</div>
                <div className="text-sm text-gray-600">Privacy-first, Client-side</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}