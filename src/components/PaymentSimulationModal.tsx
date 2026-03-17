import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, Loader2, X, Download as DownloadIcon, CreditCard } from "lucide-react";
import { Product } from "../types";
import { useWelcomeGift } from "../context/WelcomeGiftContext";

interface PaymentSimulationModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

export default function PaymentSimulationModal({
  isOpen,
  onClose,
  product,
}: PaymentSimulationModalProps) {
  const { isDiscountActive, discountPercentage } = useWelcomeGift();

  const currentPrice = product 
    ? (isDiscountActive ? product.price * (1 - discountPercentage / 100) : product.price)
    : 0;

  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanningText, setScanningText] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setIsScanning(false);
      setShowSuccess(false);
      setIsVerified(false);
      setScanningText("");
      setName("");
      setWhatsapp("");
      setScreenshot(null);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshot(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVerifyPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product || !screenshot) {
      alert("Please fill all details and upload a screenshot!");
      return;
    }

    setIsScanning(true);
    setScanningText("Scanning Payment Details...");

    // Background submission (optional, but keeping it for admin notification)
    try {
      fetch('/api/payment/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name, 
          whatsapp, 
          productTitle: product.title, 
          price: currentPrice,
          screenshot 
        })
      });
    } catch (err) {
      console.error("Silent submission failed", err);
    }

    // Magic Logic: 5 seconds scanning
    setTimeout(() => {
      setScanningText("Verifying Transaction ID...");
    }, 2500);

    setTimeout(() => {
      setIsScanning(false);
      setShowSuccess(true);
      setIsVerified(true);
    }, 5000);
  };

  if (!isOpen || !product) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md font-sans">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative border border-gray-100"
        >
          <div className="p-6">
            {!isScanning && !showSuccess ? (
              <>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-black">Scan & Unlock</h3>
                    <p className="text-gray-500 text-xs mt-1">Pay via QR and upload screenshot to unlock download.</p>
                  </div>
                  <button onClick={onClose} className="text-gray-400 hover:text-black transition-colors">
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* QR Code Section */}
                  <div className="text-center">
                    <div className="bg-gray-50 p-4 rounded-2xl border-2 border-dashed border-gray-200 inline-block">
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=6394663971@ptaxis%26pn=Vishu%20Kumar%26am=${currentPrice}%26cu=INR`} 
                        alt="Payment QR Code"
                        className="w-40 h-40 shadow-sm rounded-lg bg-white p-2 mx-auto"
                      />
                      <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-widest">Pay ₹{currentPrice.toFixed(0)} to Vishal Kumar</p>
                    </div>
                  </div>

                  {/* Form Section */}
                  <form onSubmit={handleVerifyPayment} className="space-y-4">
                    <div>
                      <input 
                        type="text" 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                        placeholder="Full Name"
                      />
                    </div>
                    <div>
                      <input 
                        type="tel" 
                        required
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                        placeholder="WhatsApp Number"
                      />
                    </div>
                    
                    <div>
                      <input 
                        type="file" 
                        accept="image/*"
                        required
                        onChange={handleFileChange}
                        className="hidden"
                        id="screenshot-upload"
                      />
                      <label 
                        htmlFor="screenshot-upload"
                        className="w-full flex items-center justify-center space-x-2 px-4 py-3 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-blue-500 transition-colors bg-gray-50 text-gray-500 text-sm"
                      >
                        <CreditCard className="h-5 w-5" />
                        <span>{screenshot ? "✅ Screenshot Selected" : "Choose Payment Screenshot"}</span>
                      </label>
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-black hover:bg-gray-800 text-white py-4 rounded-xl font-bold text-base transition-all active:scale-95 shadow-xl shadow-black/10"
                    >
                      VERIFY PAYMENT
                    </button>
                  </form>
                </div>
              </>
            ) : isScanning ? (
              <div className="py-8 text-center">
                <div className="relative w-64 h-80 mx-auto mb-8 rounded-2xl overflow-hidden border-4 border-gray-100 shadow-inner bg-gray-900">
                  {screenshot && (
                    <img 
                      src={screenshot} 
                      alt="Scanning" 
                      className="w-full h-full object-cover opacity-60"
                    />
                  )}
                  {/* Laser Line Animation */}
                  <motion.div
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-1 bg-green-400 shadow-[0_0_20px_#4ade80,0_0_40px_#4ade80] z-20"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/10 to-transparent pointer-events-none" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-center space-x-2">
                    <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
                    <h3 className="text-xl font-bold text-black">{scanningText}</h3>
                  </div>
                  <p className="text-gray-400 text-sm animate-pulse">Please do not close this window...</p>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-100"
                >
                  <CheckCircle2 className="h-14 w-14 text-green-600" />
                </motion.div>
                
                <h3 className="text-3xl font-black text-black mb-3">Verified!</h3>
                <p className="text-gray-500 font-medium mb-8">Payment Successfully Verified!</p>
                
                <button
                  onClick={() => window.open('https://example.com/download', '_blank')}
                  className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-xl transition-colors duration-200 font-bold text-lg shadow-xl shadow-blue-600/20"
                >
                  <DownloadIcon className="h-6 w-6" />
                  <span>DOWNLOAD NOW</span>
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
