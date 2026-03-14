import { ArrowLeft } from "lucide-react";

interface RefundPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RefundPolicyModal({ isOpen, onClose }: RefundPolicyModalProps) {
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
              REFUND POLICY
            </h2>
          </div>

          {/* Content */}
          <div className="px-8 py-12 md:px-16 md:py-16 text-slate-800 text-[15px] leading-relaxed font-sans">
            <div className="space-y-10 max-w-3xl mx-auto">
              
              <section>
                <h3 className="text-lg font-bold text-black mb-4 uppercase tracking-wide border-b border-slate-200 pb-2">Digital Product Nature</h3>
                <p className="text-slate-600">
                  Since our website offers non-tangible, irrevocable digital goods (PLR Bundles, E-books, and Digital Assets), we do not provide refunds after the product is purchased and the download link is generated. By completing your purchase, you acknowledge and agree to this Strict No-Refund Policy.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-black mb-4 uppercase tracking-wide border-b border-slate-200 pb-2">Non-Returnable Items</h3>
                <p className="text-slate-600">
                  Digital products cannot be physically returned or "un-downloaded." Therefore, "change of mind" or "mistaken purchase" does not qualify for a refund. We encourage customers to read the product description and "What’s Inside" section thoroughly before making a payment.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-black mb-4 uppercase tracking-wide border-b border-slate-200 pb-2">Exceptional Circumstances</h3>
                <p className="text-slate-600 mb-4">
                  We only honor refund requests under the following conditions:
                </p>
                <ul className="space-y-3 text-slate-600">
                  <li><strong className="text-slate-800">Non-delivery of the product:</strong> Due to an issue with the automated mail or server, if you do not receive the download link within 24 hours.</li>
                  <li><strong className="text-slate-800">Corrupted Files:</strong> If the files provided are corrupted or broken and our technical team is unable to provide a working replacement within 7 working days.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-bold text-black mb-4 uppercase tracking-wide border-b border-slate-200 pb-2">Contact Us</h3>
                <p className="text-slate-600">
                  For any issues regarding your download or access, please contact our support team at <strong className="text-slate-800">rajverma123orai@gmail.com</strong> within 24 hours of purchase.
                </p>
              </section>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
