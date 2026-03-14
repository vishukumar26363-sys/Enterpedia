import { ArrowLeft } from "lucide-react";

interface LicenseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LicenseModal({ isOpen, onClose }: LicenseModalProps) {
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
              MASTER RESELL & PRIVATE LABEL RIGHTS AGREEMENT
            </h2>
          </div>

          {/* Content */}
          <div className="px-8 py-12 md:px-16 md:py-16 text-slate-800 text-[15px] leading-relaxed font-sans">
            <div className="space-y-10 max-w-3xl mx-auto">
              
              <section>
                <h3 className="text-lg font-bold text-black mb-3 uppercase tracking-wide">1. Definitions and Scope</h3>
                <p className="text-slate-600">
                  This Master Resell Rights (MRR) and Private Label Rights (PLR) Agreement ('Agreement') is a legal contract between the Seller ('Licensor') and the Buyer ('Licensee'). By purchasing this Digital Bundle, the Licensee agrees to be bound by the terms and conditions outlined herein. This agreement governs the use, rebranding, and distribution of all digital assets included in the package.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-black mb-3 uppercase tracking-wide">2. Grant of Private Label Rights (PLR)</h3>
                <p className="text-slate-600 mb-3">The Licensor hereby grants the Licensee a non-exclusive, perpetual, worldwide right to:</p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600 marker:text-slate-400">
                  <li>Modify, edit, and rebrand the content in its entirety.</li>
                  <li>Affix the Licensee’s own brand name, logo, and identity to the products.</li>
                  <li>Combine the products with other digital assets to create unique bundles.</li>
                  <li>Extract specific portions of the content for use in blog posts, social media, or newsletters.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-bold text-black mb-3 uppercase tracking-wide">3. Master Resell Rights (MRR) Authorization</h3>
                <p className="text-slate-600">
                  The Licensee is officially authorized to resell the products to end-users and keep 100% of the generated revenue. There are no ongoing royalties, backend commissions, or reporting requirements. The Licensee has full control over the pricing strategy, marketing channels, and sales funnels.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-black mb-3 uppercase tracking-wide">4. Distribution & Marketplace Guidelines</h3>
                <p className="text-slate-600 mb-3">The Licensee may distribute the products through:</p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600 marker:text-slate-400 mb-4">
                  <li>Self-hosted websites and e-commerce platforms (Shopify, WooCommerce, etc.).</li>
                  <li>Social media commerce (Instagram Shop, Facebook Marketplace).</li>
                  <li>Email marketing sequences and lead magnets.</li>
                  <li>Membership sites (Paid access only).</li>
                </ul>
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-md">
                  <p className="text-red-800 font-medium text-sm">
                    Restriction: The products may NOT be sold or distributed on freelance service marketplaces (Fiverr, Upwork) as a 'service-for-hire' unless significantly modified.
                  </p>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-bold text-black mb-3 uppercase tracking-wide">5. Pricing Integrity & Anti-Devaluation</h3>
                <p className="text-slate-600">
                  To maintain the value of the digital assets, the Licensee is encouraged to maintain a fair market price. While the Licensee has the right to set prices, the 'Giveaway' of the entire bundle for $0.00 is strictly prohibited to prevent market saturation and brand devaluation.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-black mb-3 uppercase tracking-wide">6. Intellectual Property & Copyright</h3>
                <p className="text-slate-600">
                  While the Licensee has the right to rebrand the products, the underlying source code (if applicable) and original structural intellectual property remain the property of the Licensor. The Licensee may not claim 'Original Copyright' over the unmodified source files but may claim copyright over the 'Derived Works' (the rebranded version).
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-black mb-3 uppercase tracking-wide">7. No-Refund Policy on Digital Assets</h3>
                <p className="text-slate-600">
                  Due to the nature of digital downloads and the immediate transfer of the License upon purchase, all sales are final. The Licensee acknowledges that they gain instant access to the 'Profit-Generating Assets' and therefore waives the right to a refund once the download link is accessed.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-black mb-3 uppercase tracking-wide">8. Limitation of Liability</h3>
                <p className="text-slate-600">
                  The Licensor shall not be held liable for any loss of profits, data, or business opportunities resulting from the use or inability to use the products. The Licensee operates their business at their own risk and is responsible for their own marketing and legal compliance.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-black mb-3 uppercase tracking-wide">9. Termination of License</h3>
                <p className="text-slate-600">
                  This license is valid for a lifetime unless the Licensee violates the 'Anti-Free Distribution' clause. In the event of a breach, the Licensor reserves the right to revoke the Resell Rights.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-black mb-3 uppercase tracking-wide">10. Acceptance of Terms</h3>
                <p className="text-slate-600">
                  By clicking 'Purchase' or 'Download,' the Licensee confirms they have read, understood, and agreed to this 10-point Master License Agreement.
                </p>
              </section>

            </div>

            {/* Digital Signature Box */}
            <div className="mt-16 pt-12 border-t border-slate-200 max-w-2xl mx-auto">
              <div className="bg-slate-50 rounded-xl p-8 border border-slate-200 flex flex-col items-center text-center">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Digital Signature</p>
                <div className="w-full max-w-xs border-b-2 border-slate-800 pb-2 mb-4">
                  <span className="font-serif italic text-4xl text-slate-800">Agreed & Accepted</span>
                </div>
                <p className="text-sm font-medium text-slate-500">
                  Date of Access: <span className="text-slate-800">{new Date().toLocaleDateString()}</span>
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
