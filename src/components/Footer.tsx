import { Facebook, Twitter, Instagram, Mail, Hexagon } from "lucide-react";

interface FooterProps {
  onOpenContact?: () => void;
  onOpenFaq?: () => void;
  onOpenPrivacyPolicy?: () => void;
  onOpenTermsOfService?: () => void;
  onOpenRefundPolicy?: () => void;
}

export default function Footer({ onOpenContact, onOpenFaq, onOpenPrivacyPolicy, onOpenTermsOfService, onOpenRefundPolicy }: FooterProps) {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-white/10 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -bottom-[50%] left-[20%] w-[60%] h-[60%] rounded-full bg-violet-600/10 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <a
              href="/"
              className="flex items-center gap-2 text-3xl font-display font-bold text-white tracking-tight mb-6 w-fit"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-400 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-violet-500/30">
                <Hexagon className="w-6 h-6 fill-white/20" />
              </div>
              <span>
                Enter
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400">
                  pedia
                </span>
              </span>
            </a>
            <p className="text-slate-400 text-sm mb-8 max-w-sm leading-relaxed">
              Enterpedia is India's premier digital marketplace specializing in High-Quality PLR Digital Products and Master Resell Rights (MRR) assets. Our platform empowers creators with the best Viral Instagram Reels Bundles, AI Video Content, Premium Ebooks, and Digital Marketing Courses designed for passive income. Whether you are looking for Ready-to-Resell Bundles or Exclusive Digital Assets, Enterpedia provides the most trending and SEO-optimized content to scale your online business. Join thousands of successful Indian entrepreneurs who trust Enterpedia for Commercial License Digital Assets and top-tier resellable resources at the best prices
            </p>
            <div className="flex space-x-5">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-violet-600 hover:text-white transition-all duration-300"
              >
                <span className="sr-only">Facebook</span>
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-pink-600 hover:text-white transition-all duration-300"
              >
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-sky-500 hover:text-white transition-all duration-300"
              >
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-6">
              Quick Links
            </h3>
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-sm text-slate-400 hover:text-violet-400 transition-colors"
                >
                  Shop All
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenFaq}
                  className="text-sm text-slate-400 hover:text-violet-400 transition-colors text-left"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  className="text-sm text-slate-400 hover:text-violet-400 transition-colors text-left"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-6">
              Legal
            </h3>
            <ul className="space-y-4">
              <li>
                <button
                  onClick={onOpenPrivacyPolicy}
                  className="text-sm text-slate-400 hover:text-violet-400 transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTermsOfService}
                  className="text-sm text-slate-400 hover:text-violet-400 transition-colors text-left"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenRefundPolicy}
                  className="text-sm text-slate-400 hover:text-violet-400 transition-colors text-left"
                >
                  Refund Policy
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2 max-w-md">
            <p className="text-slate-500 text-xs leading-relaxed mb-2 text-center md:text-left">
              Enterpedia is India's trusted platform for Premium PLR Digital Products with Master Resell Rights. We offer the best Viral Reels Bundles, AI Video Assets, and Ebooks to help you start your digital business and earn passive income.
            </p>
            <a 
              href="mailto:rajverma123orai@gmail.com"
              className="flex items-center text-slate-500 text-sm hover:text-violet-400 transition-colors"
            >
              <Mail className="h-4 w-4 mr-2" />
              rajverma123orai@gmail.com
            </a>
            <p className="text-sm text-slate-500">
              &copy; 2026 Enterpedia. All rights reserved.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-3">
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">100% Secure Payments</span>
            <div className="flex items-center gap-3">
              {/* PhonePe */}
              <div className="bg-white px-3 py-1.5 rounded flex items-center justify-center shadow-sm hover:scale-105 transition-transform cursor-default">
                <span className="text-[#5f259f] font-bold text-[13px] tracking-tight">PhonePe</span>
              </div>
              {/* GPay */}
              <div className="bg-white px-3 py-1.5 rounded flex items-center justify-center shadow-sm hover:scale-105 transition-transform cursor-default">
                <span className="text-slate-600 font-medium text-[13px] flex items-center">
                  <span className="text-[#4285F4] font-bold text-sm mr-0.5">G</span>Pay
                </span>
              </div>
              {/* Paytm */}
              <div className="bg-white px-3 py-1.5 rounded flex items-center justify-center shadow-sm hover:scale-105 transition-transform cursor-default">
                <span className="text-[#002970] font-bold text-[13px] tracking-wide">Paytm</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
