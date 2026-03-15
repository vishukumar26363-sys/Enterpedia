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
  const [orderStatus, setOrderStatus] = useState<'idle' | 'pending' | 'approved'>('idle');
  const [orderId, setOrderId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pollingInterval = useRef<NodeJS.Timeout | null>(null);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setOrderStatus('idle');
      setOrderId(null);
      setName("");
      setWhatsapp("");
      setIsSubmitting(false);
    } else {
      if (pollingInterval.current) clearInterval(pollingInterval.current);
    }
    return () => {
      if (pollingInterval.current) clearInterval(pollingInterval.current);
    };
  }, [isOpen]);

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
    if (!product) return;
    
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

  if (!isOpen || !product) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative"
        >
          <div className="p-5 md:p-7">
            {orderStatus === 'idle' ? (
              <>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-black">Checkout</h3>
                    <p className="text-gray-500 text-sm">Enter your details to proceed with the payment.</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-black transition-colors p-1"
                  >
                    <X className="h-7 w-7" />
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
                      {/* QR Code Image */}
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=6394663971@ptaxis%26pn=Vishu%20Kumar%26am=${currentPrice}%26cu=INR`} 
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
