import React, { useState, useEffect } from "react";
import { useWelcomeGift } from "../context/WelcomeGiftContext";
import { Gift, X, Clock, Sparkles, User, Mail } from "lucide-react";

export default function WelcomeGift() {
  const {
    isDiscountActive,
    discountEndTime,
    hasClaimed,
    claimOffer,
    isModalOpen,
    setIsModalOpen,
    showGiftBox
  } = useWelcomeGift();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number } | null>(null);

  // Post-claim timer (Top Banner)
  useEffect(() => {
    if (isDiscountActive && discountEndTime) {
      const updateTimer = () => {
        const now = Date.now();
        const difference = discountEndTime - now;

        if (difference <= 0) {
          setTimeLeft(null);
          return;
        }

        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ hours, minutes, seconds });
      };

      updateTimer();
      const interval = setInterval(updateTimer, 1000);
      return () => clearInterval(interval);
    }
  }, [isDiscountActive, discountEndTime]);

  const handleClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!name.trim()) {
      setError("Please enter your name.");
      setIsLoading(false);
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email address.");
      setIsLoading(false);
      return;
    }

    const { success, message } = await claimOffer(email, name);

    if (!success) {
      setError(message);
    }
    setIsLoading(false);
  };

  const formatTime = (time: { hours: number; minutes: number; seconds: number }) => {
    return `${String(time.hours).padStart(2, '0')}:${String(time.minutes).padStart(2, '0')}:${String(time.seconds).padStart(2, '0')}`;
  };

  return (
    <>
      {/* Floating Timer Badge */}
      {isDiscountActive && timeLeft && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-40 bg-[#1A1A1A] px-5 py-2.5 rounded-full shadow-xl flex items-center gap-2 border border-white/10">
          <Clock className="w-4 h-4 text-[#E31E24]" />
          <span className="font-mono font-bold tracking-wider text-white">
            {formatTime(timeLeft)}
          </span>
        </div>
      )}

      {/* Floating Gift Box */}
      {!hasClaimed && showGiftBox && !isModalOpen && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-6 right-4 z-40 bg-[#E31E24] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform animate-bounce cursor-pointer group"
          aria-label="Claim Welcome Gift"
        >
          <Gift className="w-8 h-8" />
          <span className="absolute -top-10 right-0 bg-black text-white text-xs font-bold px-3 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Claim 50% OFF!
          </span>
        </button>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden relative animate-in fade-in zoom-in duration-300 border border-white/20">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-red-50 to-white -z-10"></div>
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-100 rounded-full blur-2xl opacity-50"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-red-100 rounded-full blur-2xl opacity-50"></div>

            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black hover:bg-gray-100 p-2 rounded-full transition-all z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8 text-center relative z-0">
              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-[#E31E24] to-red-600 rounded-full flex items-center justify-center shadow-lg shadow-red-500/30">
                  <Gift className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 p-1.5 rounded-full shadow-sm animate-pulse">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>

              <h2 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
                You Found a <span className="text-[#E31E24]">Secret Gift!</span>
              </h2>
              <p className="text-slate-500 mb-8 text-sm leading-relaxed px-2">
                Congratulations! You've unlocked a one-time <strong className="text-slate-800">50% OFF</strong> discount across our entire store. Valid for the next 2 hours only.
              </p>

              <form onSubmit={handleClaim} className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your First Name"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E31E24]/20 focus:border-[#E31E24] transition-all text-slate-900 font-medium placeholder:font-normal"
                    required
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your Best Email"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E31E24]/20 focus:border-[#E31E24] transition-all text-slate-900 font-medium placeholder:font-normal"
                    required
                  />
                </div>

                {error && (
                  <div className="text-[#E31E24] text-sm font-medium bg-red-50 border border-red-100 p-3 rounded-xl text-left flex items-start gap-2">
                    <div className="mt-0.5 shrink-0">⚠️</div>
                    <div>{error}</div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-[#E31E24] to-red-600 text-white font-bold py-4 px-4 rounded-xl hover:shadow-lg hover:shadow-red-500/30 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:transform-none flex items-center justify-center text-lg mt-2"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    "Reveal My 50% Discount"
                  )}
                </button>
              </form>

              <p className="text-[11px] text-slate-400 mt-6 font-medium">
                *Strictly one per device.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
