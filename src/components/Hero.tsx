import { useEffect } from "react";
import { ArrowRight, Check, Zap, ShieldCheck, RefreshCcw, Award, Gem, Headset } from "lucide-react";
import TrustReviews from "./TrustReviews";

interface HeroProps {
  isLoggedIn: boolean;
  onOpenAuth: () => void;
  onShowProducts?: () => void;
  onOpenLicense?: () => void;
}

export default function Hero({ isLoggedIn, onOpenAuth, onShowProducts, onOpenLicense }: HeroProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative bg-slate-950 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[40%] -left-[10%] w-[70%] h-[70%] rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-pink-600/20 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-32 pb-48 sm:pt-48 sm:pb-64 lg:pt-64 lg:pb-96">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-violet-300 text-sm font-medium mb-8 backdrop-blur-sm">
            <Zap className="w-4 h-4 mr-2 text-pink-400" />
            #1 Digital Product Creator
          </div>

          <h1 className="text-4xl tracking-tight font-display font-extrabold text-white sm:text-6xl md:text-7xl lg:text-8xl mb-6">
            Premium PLR Digital Products: <br className="hidden md:block" />
            <span className="text-gradient">Get Free Samples & Best Resell Bundles</span>
          </h1>

          <p className="mt-6 text-lg text-slate-300 sm:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Stop wasting months creating content from scratch. Get instant access to High-Quality PLR Products, including Done-for-you Video Courses, Premium Ebooks, Viral Reels Templates, and expert guides. With Master Resell Rights (MRR), you can rebrand them, sell them as your own, or use them to grow your business. You own the Digital Assets—100% of the profit stays with you.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-6">
            <button
              onClick={isLoggedIn ? onShowProducts : onOpenAuth}
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-full text-white bg-gradient-primary hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/25 cursor-pointer"
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>

            <div className="flex items-center text-sm text-slate-400 font-medium">
              <div className="flex -space-x-2 mr-4">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-slate-950"
                    src={`https://i.pravatar.cc/100?img=${i + 10}`}
                    alt="User"
                  />
                ))}
              </div>
              Join 5,000+ creators
            </div>
          </div>

          {/* Custom Grid Layout */}
          <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-4 max-w-lg mx-auto w-full">
            {/* Row 1, Column 1 */}
            <div className="flex items-center justify-end">
              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-violet-500 mr-2 shrink-0">
                <Check className="w-3 h-3 text-white" strokeWidth={3} />
              </div>
              <span className="text-sm text-white font-medium whitespace-nowrap">Created By Experts</span>
            </div>
            
            {/* Row 1, Column 2 */}
            <div className="flex items-center justify-start">
              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-violet-500 mr-2 shrink-0">
                <Check className="w-3 h-3 text-white" strokeWidth={3} />
              </div>
              <span className="text-sm text-white font-medium whitespace-nowrap">Keep 100% Profit</span>
            </div>

            {/* Row 2 (Full Width/Centered) */}
            <div className="col-span-2 flex items-center justify-center">
              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-violet-500 mr-2 shrink-0">
                <Check className="w-3 h-3 text-white" strokeWidth={3} />
              </div>
              <span className="text-sm text-white font-medium whitespace-nowrap">Private Label Rights</span>
            </div>
          </div>
        </div>
      </div>

      {/* Text above white section */}
      <div className="text-center py-8 bg-pink-50">
        <p className="text-slate-600 font-medium text-lg tracking-wide">
          Our content is used by <br />
          professionals from
        </p>
        
        {/* Pill-shaped button */}
        <div className="mt-32">
          <button
            onClick={isLoggedIn ? onShowProducts : onOpenAuth}
            className="inline-flex items-center justify-center px-6 py-1.5 text-xs font-bold text-white rounded-full bg-gradient-primary hover:opacity-90 transition-opacity shadow-md shadow-violet-500/25 cursor-pointer"
          >
            Get Instant Access to Premium PLR
          </button>
        </div>
      </div>

      {/* New Hero Section */}
      <div className="bg-pink-50 -mt-4 py-2 px-4 text-center">
        <h2 className="text-4xl tracking-tight font-display font-bold text-black sm:text-6xl md:text-7xl lg:text-8xl">
          Premium PLR Bundles <br />
          <span className="text-gradient">with Resell Rights</span>
        </h2>
        <p className="mt-4 text-lg text-slate-800 max-w-2xl mx-auto font-light leading-relaxed">
          Quit spending time on research and design. Instantly grab Professional PLR Video Courses, Viral Reels Assets, and expert-written Digital Ebooks. With Master Resell Rights, you can customize them, sell them as your own, and build your business. Take total license control of these Premium Digital Products—you pocket 100% of the revenue forever.
        </p>

        {/* New Categories Grid */}
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-4 max-w-lg mx-auto w-full">
          {/* Row 1, Column 1 */}
          <div className="flex items-center justify-end">
            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-violet-500 mr-2 shrink-0">
              <Check className="w-3 h-3 text-white" strokeWidth={3} />
            </div>
            <span className="text-sm text-slate-800 font-medium whitespace-nowrap">Business & Marketing</span>
          </div>
          
          {/* Row 1, Column 2 */}
          <div className="flex items-center justify-start">
            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-violet-500 mr-2 shrink-0">
              <Check className="w-3 h-3 text-white" strokeWidth={3} />
            </div>
            <span className="text-sm text-slate-800 font-medium whitespace-nowrap">AI, Tech & Finance</span>
          </div>

          {/* Row 2 (Full Width/Centered) */}
          <div className="col-span-2 flex items-center justify-center">
            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-violet-500 mr-2 shrink-0">
              <Check className="w-3 h-3 text-white" strokeWidth={3} />
            </div>
            <span className="text-sm text-slate-800 font-medium whitespace-nowrap">Self Development</span>
          </div>
        </div>
      </div>

      {/* Expanded White Section with 6 Rounded Cards */}
      <div className="bg-pink-50 py-16 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-10">
            {/* Row 1 */}
            {/* Card 1 */}
            <div className="bg-slate-900 rounded-[32px] p-8 relative overflow-hidden flex flex-col justify-center min-h-[260px] shadow-xl hover:scale-105 transition-transform duration-300 group">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Instant Delivery</h3>
                <p className="text-slate-300 text-sm leading-relaxed font-medium">Get your files immediately after checkout. No waiting.</p>
              </div>
              <div className="absolute -right-6 -bottom-6 opacity-10 transform rotate-12 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <Zap className="w-40 h-40 text-white" />
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-gradient-to-br from-violet-600 to-pink-600 rounded-[32px] p-8 relative overflow-hidden flex flex-col justify-center min-h-[260px] shadow-xl hover:scale-105 transition-transform duration-300 group">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Secure Payment</h3>
                <p className="text-white/90 text-sm leading-relaxed font-medium">100% encrypted and safe transactions via trusted gateways.</p>
              </div>
              <div className="absolute -right-6 -bottom-6 opacity-20 transform -rotate-12 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
                <ShieldCheck className="w-40 h-40 text-white" />
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-900 rounded-[32px] p-8 relative overflow-hidden flex flex-col justify-center min-h-[260px] shadow-xl hover:scale-105 transition-transform duration-300 group">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Lifetime Updates</h3>
                <p className="text-slate-300 text-sm leading-relaxed font-medium">Buy once, and get all future versions for free.</p>
              </div>
              <div className="absolute -right-6 -bottom-6 opacity-10 transform rotate-12 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <RefreshCcw className="w-40 h-40 text-white" />
              </div>
            </div>

            {/* Row 2 */}
            {/* Card 4 */}
            <div className="bg-gradient-to-br from-violet-600 to-pink-600 rounded-[32px] p-8 relative overflow-hidden flex flex-col justify-center min-h-[260px] shadow-xl hover:scale-105 transition-transform duration-300 group">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Full Resell Rights</h3>
                <p className="text-white/90 text-sm leading-relaxed font-medium">Rebrand and resell these products as your own for 100% profit.</p>
              </div>
              <div className="absolute -right-6 -bottom-6 opacity-20 transform -rotate-12 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
                <Award className="w-40 h-40 text-white" />
              </div>
            </div>

            {/* Card 5 */}
            <div className="bg-slate-900 rounded-[32px] p-8 relative overflow-hidden flex flex-col justify-center min-h-[260px] shadow-xl hover:scale-105 transition-transform duration-300 group">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Premium Quality</h3>
                <p className="text-slate-300 text-sm leading-relaxed font-medium">Hand-picked, high-resolution assets that beat the competition.</p>
              </div>
              <div className="absolute -right-6 -bottom-6 opacity-10 transform rotate-12 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <Gem className="w-40 h-40 text-white" />
              </div>
            </div>

            {/* Card 6 */}
            <div className="bg-gradient-to-br from-violet-600 to-pink-600 rounded-[32px] p-8 relative overflow-hidden flex flex-col justify-center min-h-[260px] shadow-xl hover:scale-105 transition-transform duration-300 group">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">24/7 Support</h3>
                <p className="text-white/90 text-sm leading-relaxed font-medium">Dedicated help for any technical or product-related queries.</p>
              </div>
              <div className="absolute -right-6 -bottom-6 opacity-20 transform -rotate-12 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
                <Headset className="w-40 h-40 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Button Section */}
      <div className="bg-pink-50 pt-24 pb-24 text-center px-4">
        <button
          onClick={isLoggedIn ? onShowProducts : onOpenAuth}
          className="inline-flex items-center justify-center px-6 py-1.5 text-xs font-bold text-white rounded-full bg-gradient-primary hover:opacity-90 transition-opacity shadow-md shadow-violet-500/25 cursor-pointer"
        >
          Get Instant Access PLR
        </button>

        <h2 className="text-4xl tracking-tight font-display font-bold text-black sm:text-6xl md:text-7xl lg:text-8xl mt-6">
          Get Pro Courses & PLR Ebooks <br />
          <span className="text-gradient">with Resell Rights</span>
        </h2>
        <p className="mt-6 text-lg text-slate-800 sm:text-xl max-w-2xl mx-auto font-light leading-relaxed">
          Build premium, high-value assets instantly with Elite PLR Digital Content that looks like years of hard work. Join the next age of Digital Product Selling while scaling your business today with Viral Reels Templates and Ready-to-Resell Ebooks. Scale your brand with the Best PLR Bundles in the market
        </p>

        <div className="mt-24">
          <div className="inline-flex items-center justify-center px-6 py-1.5 text-xs font-bold text-white rounded-full bg-gradient-primary shadow-md shadow-violet-500/25">
            Use them without restrictions
          </div>
        </div>

        <h2 className="text-4xl tracking-tight font-display font-bold text-black sm:text-6xl md:text-7xl lg:text-8xl mt-6">
          Get Master Resell Rights on <br />
          <span className="text-gradient">This Entire Digital Product Collection</span>
        </h2>
        <p className="mt-6 text-lg text-slate-800 sm:text-xl max-w-2xl mx-auto font-light leading-relaxed">
          Market and monetize these premium PLR assets without limits. You get the power to totally rebrand and modify the entire collection to match your brand's artistic standards. With our Master Resell Rights (MRR), these high-quality digital products belong to you forever with full commercial rights. Start your own digital store today with our ready-to-sell assets
        </p>

        <h2 className="text-[28px] md:text-[32px] font-display font-bold text-black tracking-tight mt-24 mb-10">
          Sell in any way
        </h2>

        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100 text-left">
          <div className="flex flex-col gap-5">
            {[
              { title: "Direct Sales:", desc: "Sell instantly as-is." },
              { title: "Your Store:", desc: "Launch your own branded shop." },
              { title: "Bundles:", desc: "Create high-value packages." },
              { title: "Masterclasses:", desc: "Build premium courses." },
              { title: "Marketplaces:", desc: "Sell on any platform." },
              { title: "Add-ons:", desc: "Boost your existing offers." }
            ].map((point, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center shadow-sm">
                  <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                </div>
                <p className="text-base text-black font-bold leading-snug">
                  {point.title} <span className="font-normal text-slate-700">{point.desc}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        <h2 className="text-[28px] md:text-[32px] font-display font-bold text-black tracking-tight mt-24 mb-10">
          Create Big things
        </h2>

        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100 text-left">
          <div className="flex flex-col gap-[20px]">
            {[
              { title: "Membership Sites:", desc: "Add these to your monthly subscription plans." },
              { title: "Email Marketing:", desc: "Use content to build and sell to your list." },
              { title: "Webinar Bonuses:", desc: "Give these away to close high-ticket sales." },
              { title: "Physical Prints:", desc: "Convert digital assets into physical products." },
              { title: "Affiliate Gifts:", desc: "Use as incentives for your affiliate partners." },
              { title: "Lead Magnets:", desc: "Give for free to capture high-quality leads." }
            ].map((point, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center shadow-sm">
                  <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                </div>
                <p className="text-base text-black font-bold leading-snug">
                  {point.title} <span className="font-normal text-black">{point.desc}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-center space-y-4 pb-12">
          <button
            onClick={onShowProducts}
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-full text-white bg-gradient-primary hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/25 cursor-pointer"
          >
            Get Started For Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
          <button 
            onClick={onOpenLicense}
            className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors underline underline-offset-4"
          >
            See the full license
          </button>
        </div>
      </div>

      {/* Bottom curve/fade */}
      <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

      {/* Trust & Reviews Section */}
      <TrustReviews onShowProducts={onShowProducts} />
    </div>
  );
}
