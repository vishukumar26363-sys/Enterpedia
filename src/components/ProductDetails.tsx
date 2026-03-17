import React, { useEffect, useState, useRef } from "react";
import { ShoppingCart, ArrowLeft, FileText, Type, HardDrive, FileArchive, CheckCircle2, BookOpen, Download, X, CreditCard, Loader2, Bookmark } from "lucide-react";
import { Product } from "../types";
import { useWelcomeGift } from "../context/WelcomeGiftContext";
import { motion } from "motion/react";

interface ProductDetailsProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
  onDownload: (product: Product) => void;
}

export default function ProductDetails({
  product,
  onBack,
  onAddToCart,
  onDownload,
}: ProductDetailsProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { isDiscountActive, discountPercentage } = useWelcomeGift();

  const currentPrice = isDiscountActive
    ? product.price * (1 - discountPercentage / 100)
    : product.price;

  const galleryImages = [
    product.imageUrl,
    `https://picsum.photos/seed/${product.id}a/800/600`,
    `https://picsum.photos/seed/${product.id}b/800/600`,
    `https://picsum.photos/seed/${product.id}c/800/600`,
  ];

  const [activeImage, setActiveImage] = useState(galleryImages[0]);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('savedProducts');
    if (saved) {
      const savedArray = JSON.parse(saved);
      setIsSaved(savedArray.includes(product.id));
    }
  }, [product.id]);

  const toggleSave = () => {
    const saved = localStorage.getItem('savedProducts');
    let savedArray = saved ? JSON.parse(saved) : [];
    
    if (isSaved) {
      savedArray = savedArray.filter((id: string) => id !== product.id);
    } else {
      savedArray.push(product.id);
    }
    
    localStorage.setItem('savedProducts', JSON.stringify(savedArray));
    setIsSaved(!isSaved);
  };

  const licenseRights = [
    "Use in business",
    "Share with team",
    "Sell it",
    "Brand as own",
    "Edit anything",
    "Repurpose",
    "Add to community",
    "Claim as author"
  ];

  const bundleImages = Array.from({ length: 6 }).map((_, i) => `https://picsum.photos/seed/bundle${product.id}${i}/400/300`);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen font-sans bg-white"
    >
      {/* 1. TOP SECTION (The Black Header) */}
      <div className="bg-black text-white pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start">
          {/* Navigation */}
          <div className="w-full flex justify-between items-center mb-8">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors group"
            >
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Library</span>
            </button>
            
            <button
              onClick={toggleSave}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              aria-label={isSaved ? "Remove from saved" : "Save product"}
            >
              <Bookmark className={`h-5 w-5 ${isSaved ? "fill-white text-white" : ""}`} />
              <span className="font-medium hidden sm:inline">{isSaved ? "Saved" : "Save"}</span>
            </button>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-3 mb-8">
            {['Digital Marketing', 'Lead Generation', 'Paid Ads'].map((tag) => (
              <span 
                key={tag} 
                className="px-4 py-1.5 bg-[#222222] text-gray-300 rounded-full text-sm font-medium tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Main Title */}
          <h1 className="text-[36px] md:text-[42px] font-bold text-white mb-4 leading-tight tracking-tight text-left">
            {product.title}
          </h1>

          {/* Product Description */}
          <p className="text-gray-400 text-lg md:text-xl mb-10 leading-relaxed text-left max-w-2xl">
            {product.description}
          </p>

          {/* Stats Section */}
          <div className="w-full border-t border-gray-800 pt-8 mt-2">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6">
              {/* Stat 1 */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center flex-shrink-0 border border-gray-800">
                  <FileText className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-sm text-gray-500 mb-0.5">Pages</span>
                  <span className="text-lg font-bold text-white">26</span>
                </div>
              </div>
              
              {/* Stat 2 */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center flex-shrink-0 border border-gray-800">
                  <Type className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-sm text-gray-500 mb-0.5">Words</span>
                  <span className="text-lg font-bold text-white">2,699</span>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center flex-shrink-0 border border-gray-800">
                  <HardDrive className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-sm text-gray-500 mb-0.5">Size</span>
                  <span className="text-lg font-bold text-white">3.0 MB</span>
                </div>
              </div>

              {/* Stat 4 */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center flex-shrink-0 border border-gray-800">
                  <FileArchive className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-sm text-gray-500 mb-0.5">File Type</span>
                  <span className="text-lg font-bold text-white">ZIP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MIDDLE SECTION (The White Product Showcase) */}
      <div className="bg-white text-black py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Dynamic Gallery */}
          <div className="mb-12">
            {/* Large Main Image Box */}
            <div className="w-full rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 mb-4 shadow-md aspect-[4/3] md:aspect-video">
              <img
                src={activeImage}
                alt={product.title}
                className="w-full h-full object-cover transition-opacity duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* 4 Small Thumbnail Boxes */}
            <div className="grid grid-cols-4 gap-3 md:gap-4">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all ${
                    activeImage === img ? 'border-black shadow-md' : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img 
                    src={img} 
                    alt={`Thumbnail ${idx + 1}`} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Main Description */}
          <div className="prose prose-lg max-w-none text-gray-700 mb-16">
            <h2 className="text-2xl font-bold text-black mb-4">Why you need this product</h2>
            <p className="mb-4">
              This comprehensive guide is designed to take you from beginner to expert. 
              Whether you're looking to scale your own business or provide high-ticket services to clients, 
              this product gives you the exact frameworks, templates, and strategies that are working right now.
            </p>
            <p>
              Stop guessing and start implementing proven campaigns. With step-by-step instructions and 
              real-world examples, you'll be able to launch profitable strategies and upsell your services with confidence.
            </p>
          </div>

          {/* 3. BUNDLE PREVIEW (The Grid of Photos) */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-black mb-6">Inside-Look: What You're Getting</h2>
            
            {/* Collage / Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {bundleImages.map((img, idx) => (
                <div key={idx} className="rounded-lg overflow-hidden border border-gray-200 shadow-sm aspect-[3/4]">
                  <img 
                    src={img} 
                    alt={`Preview page ${idx + 1}`} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>

            {/* Feature Text */}
            <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-black mb-4">What's Inside</h3>
              <ul className="space-y-3">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-black mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 4. ACTION & RIGHTS SECTION (Buttons & Licensing) */}
          <div className="mb-16 space-y-4">
            {/* Main Action Button */}
            <button
              onClick={() => onDownload(product)}
              className="w-full flex items-center justify-center space-x-2 bg-black hover:bg-gray-800 text-white py-5 px-8 rounded-xl transition-colors duration-200 font-bold text-xl shadow-xl shadow-black/10"
            >
              <CreditCard className="h-6 w-6" />
              <span>Pay Now - ₹{currentPrice.toFixed(0)}</span>
            </button>
          </div>

          {/* Licensing Box */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 md:p-8 mb-16 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-black">You are free to:</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
              {licenseRights.map((right, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-800 font-medium">{right}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 5. FOOTER DETAILS */}
          <div className="border-t border-gray-200 pt-8">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Product Metadata</h4>
            <div className="flex flex-col space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-500">File Type</span>
                <span className="font-medium text-black">ZIP</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-500">File Size</span>
                <span className="font-medium text-black">5 MB</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-500">Date Added</span>
                <span className="font-medium text-black">March 19, 2025</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
