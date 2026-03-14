import React, { useEffect, useState, useRef } from "react";
import { ShoppingCart, ArrowLeft, FileText, Type, HardDrive, FileArchive, CheckCircle2, BookOpen, Download, X, CreditCard, Loader2 } from "lucide-react";
import { Product } from "../types";
import { useWelcomeGift } from "../context/WelcomeGiftContext";
import { motion } from "motion/react";

interface ProductDetailsProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductDetails({
  product,
  onBack,
  onAddToCart,
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [orderStatus, setOrderStatus] = useState<'idle' | 'pending' | 'approved'>('idle');
  const [orderId, setOrderId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pollingInterval = useRef<NodeJS.Timeout | null>(null);

  // Handle Admin Approval via URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const approveId = params.get('approve');
    if (approveId) {
      fetch(`/api/payment/approve/${approveId}`).then(() => {
        window.history.replaceState({}, document.title, window.location.pathname);
      });
    }
  }, []);

  // Polling for Admin Approval
  useEffect(() => {
    if (orderStatus === 'pending' && orderId) {
      pollingInterval.current = setInterval(async () => {
        try {
          const res = await fetch(`/api/payment/status/${orderId}`);
          if (res.ok) {
            const data = await res.json();
            if (data.status === 'approved') {
              setOrderStatus('approved');
              if (pollingInterval.current) clearInterval(pollingInterval.current);
            }
          }
        } catch (err) {
          console.error("Polling error:", err);
        }
      }, 3000);
    }
    return () => {
      if (pollingInterval.current) clearInterval(pollingInterval.current);
    };
  }, [orderStatus, orderId]);

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/payment/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, whatsapp, productTitle: product.title, price: currentPrice })
      });
      
      if (response.ok) {
        const data = await response.json();
        setOrderId(data.orderId);
        setOrderStatus('pending');
      }
    } catch (error) {
      console.error("Error submitting payment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-400 hover:text-white mb-8 transition-colors group"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Library</span>
          </button>

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
            {orderStatus === 'approved' ? (
              <button
                onClick={() => {
                  window.open('https://example.com/download', '_blank');
                }}
                className="w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white py-5 px-8 rounded-xl transition-colors duration-200 font-bold text-xl shadow-xl shadow-green-600/20"
              >
                <Download className="h-6 w-6" />
                <span>DOWNLOAD NOW</span>
              </button>
            ) : orderStatus === 'pending' ? (
              <button
                disabled
                className="w-full flex items-center justify-center space-x-2 bg-yellow-500 text-white py-5 px-8 rounded-xl font-bold text-xl shadow-xl shadow-yellow-500/20 opacity-80 cursor-not-allowed"
              >
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                <span>Waiting for Admin Approval...</span>
              </button>
            ) : (
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full flex items-center justify-center space-x-2 bg-black hover:bg-gray-800 text-white py-5 px-8 rounded-xl transition-colors duration-200 font-bold text-xl shadow-xl shadow-black/10"
              >
                <CreditCard className="h-6 w-6" />
                <span>Pay Now - ₹{currentPrice.toFixed(0)}</span>
              </button>
            )}
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

      {/* Checkout Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-5 md:p-7 w-full max-w-lg max-h-[90vh] overflow-y-auto relative shadow-2xl"
          >
            {orderStatus === 'idle' ? (
              <>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-black">Checkout</h3>
                    <p className="text-gray-500 text-sm">Enter your details to proceed with the payment.</p>
                  </div>
                  <button 
                    onClick={() => {
                      if (orderStatus === 'approved') {
                        setIsModalOpen(false);
                      } else {
                        alert("Please complete the payment and wait for admin approval to close this page.");
                      }
                    }}
                    className={`transition-colors p-1 ${orderStatus === 'approved' ? 'text-gray-400 hover:text-black' : 'text-gray-200 cursor-not-allowed'}`}
                  >
                    <X className="w-7 h-7" />
                  </button>
                </div>
                
                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black focus:border-black outline-none transition-all text-black"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
                    <input 
                      type="tel" 
                      required
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-black focus:border-black outline-none transition-all text-black"
                      placeholder="+91 9876543210"
                    />
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100">
                    <div className="text-center mb-4">
                      <h4 className="text-2xl font-bold text-black">Vishal Kumar Verma</h4>
                      <div className="h-1 w-16 bg-black mx-auto mt-2 rounded-full"></div>
                    </div>
                    <p className="text-sm font-bold text-black mb-3 text-center uppercase tracking-wider">Scan QR to Pay ₹{currentPrice.toFixed(0)}</p>
                    <div className="bg-gray-50 p-4 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center">
                      <img 
                        src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=6394663971@ptaxis%26pn=Vishu%20Kumar%26am=10%26cu=INR" 
                        alt="Payment QR Code"
                        className="w-52 h-52 mb-4 shadow-lg rounded-lg bg-white p-2"
                      />
                      <p className="text-xs text-gray-400 uppercase font-bold">Scan with any UPI App</p>
                    </div>
                  </div>
                  
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-6 bg-black hover:bg-gray-800 text-white py-4 rounded-xl font-bold text-lg transition-colors flex justify-center items-center shadow-xl shadow-black/10 disabled:opacity-50"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin h-6 w-6" /> : "Submit Payment Details"}
                  </button>
                </form>
              </>
            ) : orderStatus === 'pending' ? (
              <div className="text-center flex flex-col items-center pt-8 pb-4">
                <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mb-6"></div>
                <h3 className="text-2xl font-bold text-black mb-2">Waiting for Admin Approval...</h3>
                <p className="text-gray-500 mb-2">We have received your request.</p>
                <p className="text-gray-500 text-sm mb-6">Please complete the payment on your UPI app. Once confirmed by the admin, your download will unlock automatically.</p>
                
                <div className="w-full p-4 bg-yellow-50 rounded-xl border border-yellow-100 text-yellow-800 text-sm font-medium">
                  ⚠️ This page is locked until payment is verified by Raj Verma.
                </div>
              </div>
            ) : (
              <div className="text-center flex flex-col items-center pt-8 pb-4">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-black mb-2">Payment Approved!</h3>
                <p className="text-gray-500 mb-8">Your payment has been verified. You can now download your product.</p>
                
                <button
                  onClick={() => {
                    window.open('https://example.com/download', '_blank');
                  }}
                  className="w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white py-4 px-8 rounded-xl transition-colors duration-200 font-bold text-lg shadow-xl shadow-green-600/20"
                >
                  <Download className="h-6 w-6" />
                  <span>DOWNLOAD NOW</span>
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
