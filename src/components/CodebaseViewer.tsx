import React, { useState } from 'react';
import { codebaseData } from '../codebaseData';
import { ChevronDown, ChevronUp, Code, Copy, Check, Download } from 'lucide-react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export default function CodebaseViewer() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Sort files logically
  const files = Object.keys(codebaseData).sort((a, b) => {
    const order = [
      'index.html',
      'package.json',
      'vite.config.ts',
      'tsconfig.json',
      'tsconfig.app.json',
      'tsconfig.node.json',
      'src/main.tsx',
      'src/index.css',
      'src/App.tsx',
      'src/types.ts',
      'src/data.ts',
      'src/firebase.ts'
    ];
    
    const indexA = order.indexOf(a);
    const indexB = order.indexOf(b);
    
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    
    return a.localeCompare(b);
  });

  const combinedCode = files.map(file => {
    return `// =========================================================================\n// FILE: ${file}\n// =========================================================================\n\n${codebaseData[file as keyof typeof codebaseData]}`;
  }).join('\n\n\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(combinedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    try {
      setIsDownloading(true);
      const zip = new JSZip();

      // Add all files from codebaseData to the zip
      Object.entries(codebaseData).forEach(([filePath, content]) => {
        zip.file(filePath, content);
      });

      // Generate the zip file
      const blob = await zip.generateAsync({ type: 'blob' });
      
      // Trigger download
      saveAs(blob, 'my-website-project.zip');
    } catch (error) {
      console.error('Error creating zip file:', error);
      alert('Failed to create ZIP file. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="w-full bg-gray-50 border-t border-gray-200 mt-20 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center flex-shrink-0">
              <Code className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Download Full Website Code</h2>
              <p className="text-gray-500 text-sm">Download the complete project as a ZIP file to run it anywhere</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleDownloadZip}
              disabled={isDownloading}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-lg disabled:opacity-70"
            >
              <Download className="w-5 h-5" />
              <span className="hidden sm:inline">{isDownloading ? 'Zipping...' : 'Download ZIP'}</span>
            </button>
            
            {isOpen && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors shadow-sm"
              >
                {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy All'}</span>
              </button>
            )}
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 px-6 py-3 bg-black hover:bg-gray-800 text-white rounded-lg font-medium transition-colors shadow-lg"
            >
              {isOpen ? (
                <>
                  Hide Code <ChevronUp className="w-5 h-5" />
                </>
              ) : (
                <>
                  Show Code <ChevronDown className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="bg-[#1e1e1e] rounded-xl overflow-hidden shadow-xl border border-gray-800">
            <div className="bg-[#2d2d2d] px-4 py-3 flex items-center justify-between border-b border-[#404040] sticky top-0">
              <span className="text-green-400 text-sm font-mono font-semibold">full-website-code.txt</span>
              <span className="text-gray-500 text-xs font-mono">{combinedCode.split('\n').length} lines</span>
            </div>
            <div className="p-4 overflow-x-auto max-h-[800px] overflow-y-auto custom-scrollbar">
              <pre className="text-xs sm:text-sm font-mono text-gray-300 leading-relaxed">
                <code>{combinedCode}</code>
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
