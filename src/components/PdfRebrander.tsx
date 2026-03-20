import React, { useState } from 'react';
import { X, ChevronDown, ChevronUp, UploadCloud, Image as ImageIcon, FileText, Download, Settings } from 'lucide-react';

export default function PdfRebrander() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFile(e.target.files[0]);
      setIsSidebarOpen(true);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] w-full relative overflow-hidden bg-slate-50 font-sans">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shrink-0 z-10">
        <h1 className="text-xl font-bold text-gray-900">PDF Rebrander</h1>
        <button 
          disabled={!uploadedFile}
          className={`flex items-center gap-2 px-4 py-2 font-medium rounded-lg transition-colors ${
            uploadedFile 
              ? 'bg-violet-600 text-white hover:bg-violet-700 shadow-sm' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Download PDF</span>
          <span className="sm:hidden">Download</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative w-full h-full flex items-center justify-center bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px]">
        
        {!uploadedFile ? (
          /* State 1: Empty State */
          <div className="flex flex-col items-center justify-center text-center max-w-md px-4 z-0">
            <div className="relative flex items-center justify-center mb-8">
              {/* Background Document Icon */}
              <div className="absolute -left-6 top-2 w-20 h-28 bg-white border border-gray-200 rounded-xl shadow-sm transform -rotate-6 flex items-center justify-center">
                <FileText className="w-10 h-10 text-gray-200" />
              </div>
              {/* Foreground Document Icon */}
              <div className="relative z-10 w-24 h-32 bg-white border border-gray-200 rounded-xl shadow-md flex items-center justify-center">
                <FileText className="w-12 h-12 text-violet-500" />
              </div>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">No PDF Selected</h2>
            <p className="text-gray-500 mb-8 text-base md:text-lg">
              Upload a PDF file to customize its cover and add your branding assets.
            </p>
            
            <label className="px-8 py-3.5 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg shadow-sm transition-colors flex items-center gap-2 text-lg cursor-pointer">
              <UploadCloud className="w-5 h-5" />
              Upload PDF
              <input type="file" accept=".pdf" className="hidden" onChange={handleFileUpload} />
            </label>
          </div>
        ) : (
          /* State 2: Active State (Preview Area) */
          <div className="flex flex-col items-center justify-center w-full h-full p-4 md:p-8">
            <div className="bg-white w-full max-w-2xl aspect-[1/1.4] shadow-xl rounded-lg flex flex-col items-center justify-center border border-gray-200 relative overflow-hidden">
              <FileText className="w-16 h-16 text-violet-200 mb-4" />
              <p className="text-gray-800 font-medium text-lg text-center px-4 truncate w-full max-w-md">{uploadedFile.name}</p>
              <p className="text-gray-500 text-sm mt-2">PDF Preview</p>
            </div>
            
            {!isSidebarOpen && (
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="mt-8 px-6 py-3 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg shadow-sm hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Settings className="w-5 h-5" />
                Open Design Controls
              </button>
            )}
          </div>
        )}

        {/* Overlay Background (Mobile) */}
        {isSidebarOpen && (
          <div 
            className="absolute inset-0 bg-black/20 z-20 md:hidden transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Design Controls Sidebar (Slides in from left) */}
        <div 
          className={`absolute top-0 left-0 h-full w-full max-w-[400px] bg-white border-r border-gray-200 shadow-2xl z-30 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <DesignControlsSidebar 
            onClose={() => setIsSidebarOpen(false)} 
            uploadedFile={uploadedFile}
            onFileUpload={handleFileUpload}
          />
        </div>
      </div>
    </div>
  );
}

function DesignControlsSidebar({ 
  onClose, 
  uploadedFile, 
  onFileUpload 
}: { 
  onClose: () => void;
  uploadedFile: File | null;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const [openSections, setOpenSections] = useState({
    bookFile: true,
    cover: true,
    coverLogo: true,
  });
  
  const [coverOption, setCoverOption] = useState<'default' | 'upload'>('default');
  const [uploadedLogo, setUploadedLogo] = useState<File | null>(null);
  const [uploadedCover, setUploadedCover] = useState<File | null>(null);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedLogo(e.target.files[0]);
    }
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedCover(e.target.files[0]);
    }
  };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-gray-100 shrink-0">
        <h2 className="text-lg font-semibold text-gray-900">Design Controls</h2>
        <button 
          onClick={onClose}
          className="p-1.5 hover:bg-gray-100 rounded-md text-gray-500 transition-colors focus:outline-none"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        
        {/* Book File Section */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <button 
            onClick={() => toggleSection('bookFile')}
            className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors focus:outline-none"
          >
            <span className="font-medium text-gray-800">Book File</span>
            {openSections.bookFile ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
          </button>
          
          {openSections.bookFile && (
            <div className="p-4 bg-white border-t border-gray-100">
              <label className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 hover:border-violet-400 transition-colors cursor-pointer group w-full">
                <div className="w-10 h-10 bg-violet-50 rounded-full flex items-center justify-center mb-3 group-hover:bg-violet-100 transition-colors">
                  <UploadCloud className="w-5 h-5 text-violet-600" />
                </div>
                <p className="text-sm font-medium text-gray-700 mb-1 truncate w-full px-2">
                  {uploadedFile ? uploadedFile.name : 'Upload Ebook PDF'}
                </p>
                <p className="text-xs text-gray-500">
                  {uploadedFile ? 'Click to replace PDF' : 'Drag & drop PDF'}
                </p>
                <input type="file" accept=".pdf" className="hidden" onChange={onFileUpload} />
              </label>
            </div>
          )}
        </div>

        {/* Cover Section */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <button 
            onClick={() => toggleSection('cover')}
            className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors focus:outline-none"
          >
            <span className="font-medium text-gray-800">Cover</span>
            {openSections.cover ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
          </button>
          
          {openSections.cover && (
            <div className="p-4 bg-white border-t border-gray-100">
              <div className="bg-slate-100 p-1 rounded-lg flex mb-4">
                <button 
                  onClick={() => setCoverOption('default')}
                  className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${coverOption === 'default' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Use Default Cover
                </button>
                <button 
                  onClick={() => setCoverOption('upload')}
                  className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${coverOption === 'upload' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Upload Image
                </button>
              </div>

              {coverOption === 'upload' ? (
                <label className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 hover:border-violet-400 transition-colors cursor-pointer group w-full">
                  <div className="w-10 h-10 bg-violet-50 rounded-full flex items-center justify-center mb-3 group-hover:bg-violet-100 transition-colors">
                    <ImageIcon className="w-5 h-5 text-violet-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-700 mb-1 truncate w-full px-2">
                    {uploadedCover ? uploadedCover.name : 'Upload Cover Image'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {uploadedCover ? 'Click to replace image' : 'PNG, JPG up to 5MB'}
                  </p>
                  <input type="file" accept="image/png, image/jpeg" className="hidden" onChange={handleCoverUpload} />
                </label>
              ) : (
                <div className="text-sm text-gray-500 text-center py-4">
                  Default cover will be used.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Cover Logo Section */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <button 
            onClick={() => toggleSection('coverLogo')}
            className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors focus:outline-none"
          >
            <span className="font-medium text-gray-800">Cover Logo</span>
            {openSections.coverLogo ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
          </button>
          
          {openSections.coverLogo && (
            <div className="p-4 bg-white border-t border-gray-100">
              <label className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 hover:border-violet-400 transition-colors cursor-pointer group w-full">
                <div className="w-10 h-10 bg-violet-50 rounded-full flex items-center justify-center mb-3 group-hover:bg-violet-100 transition-colors">
                  <UploadCloud className="w-5 h-5 text-violet-600" />
                </div>
                <p className="text-sm font-medium text-gray-700 mb-1 truncate w-full px-2">
                  {uploadedLogo ? uploadedLogo.name : 'Upload Logo'}
                </p>
                <p className="text-xs text-gray-500">
                  {uploadedLogo ? 'Click to replace logo' : 'Transparent PNG recommended'}
                </p>
                <input type="file" accept="image/png" className="hidden" onChange={handleLogoUpload} />
              </label>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
