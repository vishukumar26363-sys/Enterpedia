import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, Loader2, X, Download as DownloadIcon, CreditCard } from "lucide-react";
import { Product } from "../types";
import { collection, addDoc, onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";
import emailjs from "@emailjs/browser";
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

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setOrderStatus('idle');
      setOrderId(null);
      setName("");
      setWhatsapp("");
      setIsSubmitting(false);
    }
  }, [isOpen]);

  // THE MASTER KEY: Real-time listener for Admin Approval
  useEffect(() => {
    if (!orderId) return;
    const unsub = onSnapshot(doc(db, "orders", orderId), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.status === "approved") {
          setOrderStatus("approved");
        }
      }
    });
    return () => unsub();
  }, [orderId]);

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    
    // 1. INSTANT UI UPDATE
    setOrderStatus("pending");
    
    // 2. Save to Firestore in background
    addDoc(collection(db, "orders"), {
      productName: product.title,
      price: currentPrice,
      name,
      whatsapp,
      status: "pending",
      createdAt: new Date()
    }).then((docRef) => {
      setOrderId(docRef.id);
    }).catch((error) => {
      console.error("Error processing order: ", error);
    });

    // 3. Send EmailJS in background
    emailjs.send(
      "service_g7j2e2e",
      "template_njt78tb",
      {
        to_email: "rajverma123orai@gmail.com",
        customer_name: name,
        customer_whatsapp: whatsapp,
        product_name: product.title,
        price: currentPrice
      },
      "dPACZq82ut8TB56qI"
    ).catch(err => console.error("EmailJS Error:", err));
  };

  if (!isOpen || !product) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-black z-10 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="p-6 md:p-8">
            {orderStatus === 'idle' ? (
              <>
                <h3 className="text-2xl font-bold text-black mb-2">Checkout</h3>
                <p className="text-gray-500 mb-6">Enter your details to proceed with the payment for <strong>{product.title}</strong>.</p>
                
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
                    <p className="text-sm font-bold text-black mb-3 text-center uppercase tracking-wider">Scan QR to Pay ₹{currentPrice.toFixed(0)}</p>
                    <div className="bg-gray-50 p-4 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center">
                      <img 
                        src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=6394663971@ptaxis%26pn=Vishu%20Kumar%26am=10%26cu=INR" 
                        alt="Payment QR Code"
                        className="w-56 h-56 mb-4 shadow-lg rounded-lg bg-white p-2"
                      />
                      <p className="text-[10px] text-gray-400 uppercase font-bold">Scan with any UPI App</p>
                    </div>
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full mt-6 bg-black hover:bg-gray-800 text-white py-4 rounded-xl font-bold text-lg transition-colors flex justify-center items-center shadow-xl shadow-black/10"
                  >
                    Submit Payment Details
                  </button>
                </form>
              </>
            ) : orderStatus === 'pending' ? (
              <div className="text-center flex flex-col items-center pt-8 pb-4">
                <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mb-6"></div>
                <h3 className="text-2xl font-bold text-black mb-2">Waiting for Admin Approval...</h3>
                <p className="text-gray-500 mb-2">We have received your request.</p>
                <p className="text-gray-500 text-sm">Please complete the payment on your UPI app. Once confirmed by the admin, your download will unlock automatically.</p>
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
