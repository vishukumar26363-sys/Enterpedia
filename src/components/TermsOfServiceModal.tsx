import { ArrowLeft } from "lucide-react";

interface TermsOfServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TermsOfServiceModal({ isOpen, onClose }: TermsOfServiceModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-50">
      <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8 flex justify-center">
        <div className="bg-white shadow-2xl ring-1 ring-slate-200 w-full max-w-4xl rounded-2xl overflow-hidden relative h-fit">
          
          {/* Header */}
          <div className="bg-slate-900 px-8 py-10 text-center relative">
            <button
              onClick={onClose}
              className="absolute left-6 top-8 text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight mt-6 md:mt-0">
              TERMS OF SERVICE
            </h2>
          </div>

          {/* Content */}
          <div className="px-8 py-12 md:px-16 md:py-16 text-slate-800 text-[15px] leading-relaxed font-sans">
            <div className="space-y-10 max-w-3xl mx-auto">
              
              <section>
                <h3 className="text-lg font-bold text-black mb-4 uppercase tracking-wide border-b border-slate-200 pb-2">Agreement to Terms</h3>
                <p className="text-slate-600">
                  By accessing or using our website, you agree to be bound by these Terms of Service. If you do not agree to all the terms, then you may not access the website or use any services.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-black mb-4 uppercase tracking-wide border-b border-slate-200 pb-2">Licensing & Usage (PLR/MRR)</h3>
                <p className="text-slate-600 mb-4">
                  When you purchase a product, you are granted a specific license (Private Label Rights or Master Resell Rights) as mentioned in the product description.
                </p>
                <ul className="space-y-3 text-slate-600">
                  <li><strong className="text-slate-800">Rights:</strong> You may rebrand, edit, and resell the products.</li>
                  <li><strong className="text-slate-800">Restrictions:</strong> You are strictly prohibited from distributing the entire bundle for free or claiming original copyright authorship of the raw source files.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-bold text-black mb-4 uppercase tracking-wide border-b border-slate-200 pb-2">Earnings Disclaimer</h3>
                <p className="text-slate-600">
                  We make every effort to ensure that we accurately represent our products and their potential. However, we do not guarantee that you will earn any specific amount of money using the techniques and ideas in these materials. Your success depends on your own marketing efforts and business skills.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-black mb-4 uppercase tracking-wide border-b border-slate-200 pb-2">Limitation of Liability</h3>
                <p className="text-slate-600">
                  In no event shall we be liable for any damages (including, without limitation, damages for loss of data or profit) arising out of the use or inability to use the materials on our website.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-black mb-4 uppercase tracking-wide border-b border-slate-200 pb-2">Governing Law</h3>
                <p className="text-slate-600">
                  These terms and conditions are governed by and construed in accordance with the laws of India. Any disputes relating to these terms shall be subject to the exclusive jurisdiction of the courts in Orai, Uttar Pradesh, India.
                </p>
              </section>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
