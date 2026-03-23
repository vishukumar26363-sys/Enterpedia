import React, { useEffect, useState } from 'react';
import { Shield, Check, Lock, ArrowLeft } from 'lucide-react';

interface Props {
  onClose: () => void;
  plan: 'lite' | 'pro';
}

export default function MasterLibraryCheckout({ onClose, plan }: Props) {
  const [selectedCurrency, setSelectedCurrency] = useState<'INR' | 'USD'>('INR');

  // Prevent scrolling on the body when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-white overflow-y-auto w-full flex flex-col">
      {/* Top Black Section */}
      <div className="relative w-full bg-[#000000] flex flex-col items-center pt-20 sm:pt-24 pb-16 z-10">
        {/* Subtle soft gradient depth (very minimal, not visible directly) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_0%,transparent_60%)] pointer-events-none"></div>
        
        {/* Top Left Navigation - Back Arrow & Logo */}
        <div className="absolute top-4 left-3 sm:top-5 sm:left-5 flex items-center gap-0 z-50">
        <button 
          onClick={onClose}
          className="text-white/60 hover:text-white transition-colors flex items-center justify-center p-1.5 rounded-full hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <img 
          src="https://i.ibb.co/jstncJk/c3f4016b-2b10-4250-ba9b-8bf8dbc94cf8.png" 
          alt="Logo" 
          className="h-[24px] w-auto block ml-0.5"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Center Content Area - 3D Render Image */}
      <div className="relative w-full max-w-4xl px-4 sm:px-6 flex flex-col items-center justify-start mx-auto z-10">
        <img 
          src="https://i.ibb.co/QjkLj0cR/812-removebg-preview.png" 
          alt="Master Library Bundle" 
          className="w-[75%] sm:w-[65%] md:w-[55%] max-w-xl h-auto max-h-[55vh] object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.05)]"
          referrerPolicy="no-referrer"
        />
        <p className="-mt-2 text-base font-normal text-white/80 text-center">
          Master Library Lite
        </p>
        <p className="mt-2 text-sm font-normal text-white/60 text-center max-w-lg">
          More than 1000 digital products done for you to resell or use in any way. Video courses, books, templates, and more with Private Label Rights.
        </p>

        {/* Currency Selection UI */}
        <div className="mt-10 flex flex-col items-center">
          <h3 className="text-white font-semibold text-base mb-4">Choose a currency:</h3>
          
          <div className="flex flex-row gap-3 justify-center items-center">
            {/* INR Box */}
            <button
              onClick={() => setSelectedCurrency('INR')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-200 cursor-pointer ${
                selectedCurrency === 'INR' 
                  ? 'bg-[#1e1e1e] border border-white/80 shadow-[0_0_15px_rgba(255,255,255,0.15)]' 
                  : 'bg-[#141414] border border-white/5 hover:bg-[#1a1a1a]'
              }`}
            >
              <span className="text-lg leading-none">🇮🇳</span>
              <span className="text-white font-medium text-sm tracking-wide">₹9,476.17</span>
            </button>

            {/* USD Box */}
            <button
              onClick={() => setSelectedCurrency('USD')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-200 cursor-pointer ${
                selectedCurrency === 'USD' 
                  ? 'bg-[#1e1e1e] border border-white/80 shadow-[0_0_15px_rgba(255,255,255,0.15)]' 
                  : 'bg-[#141414] border border-white/5 hover:bg-[#1a1a1a]'
              }`}
            >
              <span className="text-lg leading-none">🇺🇸</span>
              <span className="text-white font-medium text-sm tracking-wide">$97.00</span>
            </button>
          </div>

          <p className="mt-5 text-[11px] text-white/40 border-b border-dotted border-white/30 pb-0.5 tracking-wide">
            1 USD = 97.6925 INR (includes 4% conversion fee)
          </p>
        </div>
      </div>
      </div>

      {/* Bottom White Section */}
      <div className="w-full bg-white flex-1 min-h-[50vh]">
        {/* Future content will go here */}
      </div>

    </div>
  );
}
