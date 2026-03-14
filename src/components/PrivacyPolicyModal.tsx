import { ArrowLeft } from "lucide-react";

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-50">
      <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8 flex justify-center">
        <div className="bg-white shadow-2xl ring-1 ring-slate-200 w-full max-w-4xl rounded-2xl overflow-hidden relative">
          
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
              PRIVACY POLICY
            </h2>
          </div>

          {/* Content */}
          <div className="px-8 py-12 md:px-16 md:py-16 text-slate-800 text-[15px] leading-relaxed font-sans">
            <div className="space-y-10 max-w-3xl mx-auto">
              
              <section>
                <h3 className="text-lg font-bold text-black mb-4 uppercase tracking-wide border-b border-slate-200 pb-2">Introduction</h3>
                <p className="text-slate-600">
                  This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from our website. We are committed to protecting your personal data and your privacy is our highest priority.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-black mb-4 uppercase tracking-wide border-b border-slate-200 pb-2">Personal Information We Collect</h3>
                <p className="text-slate-600">
                  When you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, payment information, email address, and phone number. We refer to this information as “Order Information.”
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-black mb-4 uppercase tracking-wide border-b border-slate-200 pb-2">How Do We Use Your Personal Information?</h3>
                <p className="text-slate-600 mb-4">
                  We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping/digital delivery, and providing you with invoices and/or order confirmations). Additionally, we use this Order Information to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600 marker:text-slate-400">
                  <li>Communicate with you;</li>
                  <li>Screen our orders for potential risk or fraud;</li>
                  <li>Provide you with information or advertising relating to our products or services.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-bold text-black mb-4 uppercase tracking-wide border-b border-slate-200 pb-2">Data Security</h3>
                <p className="text-slate-600">
                  We use industry-standard encryption to protect your data. Your payment details are processed through secure, PCI-compliant payment gateways. We never store your credit card or UPI details on our servers.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-black mb-4 uppercase tracking-wide border-b border-slate-200 pb-2">Third-Party Disclosure</h3>
                <p className="text-slate-600">
                  We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website or conducting our business, so long as those parties agree to keep this information confidential.
                </p>
              </section>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
