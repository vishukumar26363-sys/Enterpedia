import { useState } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";

interface FaqModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const faqs = [
  {
    question: "Is this a one-time payment?",
    answer: "Yes, it is a one-time investment. There are no monthly subscriptions or hidden costs. Once you buy it, you own the lifetime license."
  },
  {
    question: "How will I receive the products?",
    answer: "Immediately after the payment is successful, you will be redirected to the download page. You will also receive an automated email with the download links."
  },
  {
    question: "Can I really sell these products as my own?",
    answer: "Absolutely! With our Master Resell Rights (MRR) and Private Label Rights (PLR), you can rebrand, put your logo, and sell them for 100% profit."
  },
  {
    question: "What if I face issues while downloading?",
    answer: "Don't worry! You can contact our support at rajverma123orai@gmail.com or WhatsApp us at 6394663971. We usually respond within 24 hours."
  },
  {
    question: "Are these products updated?",
    answer: "Yes, we periodically update our bundles with the latest digital assets and trends to ensure you always have high-selling products in your store."
  }
];

export default function FaqModal({ isOpen, onClose }: FaqModalProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-50">
      <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8 flex justify-center">
        <div className="bg-white shadow-2xl ring-1 ring-slate-200 w-full max-w-3xl rounded-2xl overflow-hidden relative h-fit">
          
          {/* Header */}
          <div className="bg-slate-900 px-8 py-8 text-center relative">
            <button
              onClick={onClose}
              className="absolute left-6 top-8 text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight mt-8 md:mt-0">
              HELP CENTER
            </h2>
          </div>

          {/* Content */}
          <div className="px-6 py-12 md:px-12 bg-white">
            <h3 className="text-[28px] font-bold text-black mb-8 text-center">
              Common Questions
            </h3>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className="border border-slate-200 rounded-[10px] overflow-hidden bg-white"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-bold text-[16px] text-black pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown 
                      className={`w-5 h-5 text-slate-500 flex-shrink-0 transition-transform duration-300 ${
                        openIndex === index ? "rotate-180" : ""
                      }`} 
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="p-5 pt-0 text-slate-600 text-[15px] leading-relaxed">
                      <div className="pt-4 border-t border-slate-100">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
