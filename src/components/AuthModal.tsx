import React, { useState } from "react";
import { X, Mail, Lock, User, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (name: string, email: string) => void;
}

export default function AuthModal({
  isOpen,
  onClose,
  onLogin,
}: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Send notification email
    try {
      await fetch("https://formsubmit.co/ajax/rajverma123orai@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: "New User Notification",
          action: isLogin ? "User Logged In" : "New User Signed Up",
          name: isLogin ? "N/A (Login)" : name,
          email: email,
        }),
      });
    } catch (error) {
      console.error("Error sending notification:", error);
    }

    if (!isLogin) {
      // Signup flow: Switch to login, show success message, clear password
      setIsLogin(true);
      setSignupSuccess(true);
      setPassword("");
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setSignupSuccess(false);
      }, 5000);
    } else {
      // Login flow: Call onLogin to authenticate
      onLogin(name || "User", email);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col md:flex-row transform transition-all">
        {/* Left Side: Branding / Image */}
        <div className="hidden md:flex md:w-5/12 bg-slate-950 relative p-10 flex-col justify-between overflow-hidden">
          {/* Background Effects */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-[20%] -left-[20%] w-[70%] h-[70%] rounded-full bg-violet-600/30 blur-[80px]" />
            <div className="absolute bottom-[10%] -right-[20%] w-[60%] h-[60%] rounded-full bg-pink-600/20 blur-[80px]" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          </div>

          <div className="relative z-10">
            <a
              href="/"
              className="text-3xl font-display font-bold tracking-tight text-white flex items-center"
            >
              Enter
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400">
                pedia
              </span>
            </a>
            <p className="mt-6 text-lg text-slate-300 font-light leading-relaxed">
              Join the ultimate marketplace for premium PLR products. Download,
              rebrand, and keep 100% of the profits.
            </p>
          </div>

          <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 mt-8">
            <div className="flex items-center space-x-3 mb-4">
              <Sparkles className="w-6 h-6 text-pink-400" />
              <h3 className="text-white font-semibold">Premium Access</h3>
            </div>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-400 mr-2" />{" "}
                Unlimited Downloads
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-400 mr-2" />{" "}
                Master Resell Rights
              </li>
              <li className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-400 mr-2" />{" "}
                High-Quality Assets
              </li>
            </ul>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-7/12 relative flex flex-col">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors bg-slate-50 hover:bg-slate-100 p-2 rounded-full z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex-1 px-8 pt-12 pb-8 sm:px-12 flex flex-col justify-center">
            <div className="text-center md:text-left mb-8">
              <div className="md:hidden flex justify-center mb-6">
                <a
                  href="/"
                  className="text-3xl font-display font-bold tracking-tight text-slate-900"
                >
                  Enter
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-600">
                    pedia
                  </span>
                </a>
              </div>
              <h2 className="text-3xl font-display font-bold text-slate-900 mb-2">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h2>
              <p className="text-slate-500 text-sm">
                {isLogin
                  ? "Enter your details to access your premium assets."
                  : "Join Enterpedia to start downloading premium PLR products."}
              </p>
            </div>

            {signupSuccess && isLogin && (
              <div className="mb-6 p-4 bg-emerald-50 text-emerald-800 rounded-xl text-sm font-medium border border-emerald-200 flex items-start">
                <CheckCircle2 className="w-5 h-5 mr-3 flex-shrink-0 text-emerald-600 mt-0.5" />
                <div>
                  <p className="font-bold mb-0.5">Account created successfully!</p>
                  <p className="text-emerald-700">Please log in with your new credentials to continue.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="block w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 sm:text-sm bg-slate-50 outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 sm:text-sm bg-slate-50 outline-none transition-all"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-slate-700">
                    Password
                  </label>
                  {isLogin && (
                    <a
                      href="#"
                      className="text-xs font-semibold text-violet-600 hover:text-violet-700"
                    >
                      Forgot password?
                    </a>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 sm:text-sm bg-slate-50 outline-none transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-slate-900 hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-all duration-300 group mt-4"
              >
                {isLogin ? "Sign In" : "Create Account"}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 text-center mt-auto">
            <p className="text-sm text-slate-600">
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setSignupSuccess(false);
                }}
                className="font-bold text-violet-600 hover:text-violet-700 transition-colors"
              >
                {isLogin ? "Sign up now" : "Sign in"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
