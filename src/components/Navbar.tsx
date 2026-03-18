import {
  ShoppingCart,
  Menu,
  X,
  Search,
  User,
  LogOut,
  Settings,
  ChevronDown,
  Home,
  FileText,
  Bookmark,
  ClipboardList,
  Crown,
  Lightbulb,
  Folder,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isLoggedIn: boolean;
  onOpenAuth: () => void;
  onLogout: () => void;
  onGoHome: () => void;
  onShowProducts: () => void;
  onShowSaved: () => void;
  onShowRequest: () => void;
  onOpenContact: () => void;
  isProductPage?: boolean;
}

export default function Navbar({
  cartCount,
  onOpenCart,
  searchTerm,
  setSearchTerm,
  isLoggedIn,
  onOpenAuth,
  onLogout,
  onGoHome,
  onShowProducts,
  onShowSaved,
  onShowRequest,
  onOpenContact,
  isProductPage = false,
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm py-2" : "bg-transparent py-4"}`}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a
              href="/"
              className="flex items-center"
            >
              <span className="text-2xl font-display font-bold tracking-tight">
                <span className="text-white">Enter</span>
                <span className="text-gradient-logo">pedia</span>
              </span>
            </a>
          </div>

          {/* Desktop Search */}
          {isLoggedIn ? (
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-slate-400 group-focus-within:text-violet-500 transition-colors" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-11 pr-4 py-2.5 border border-slate-200 rounded-full leading-5 bg-slate-50/50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 sm:text-sm transition-all duration-300"
                  placeholder="Search premium products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          ) : (
            <div className="hidden md:flex flex-1 max-w-md mx-8"></div>
          )}

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {!isProductPage ? (
              <>
                <button
                  onClick={onShowProducts}
                  className="text-slate-600 hover:text-violet-600 font-medium text-sm transition-colors"
                >
                  Shop All
                </button>
                {isLoggedIn ? (
                  <div className="relative" ref={profileRef}>
                    <button
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center space-x-2 text-slate-600 hover:text-violet-600 transition-colors focus:outline-none"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm shadow-sm border border-white/50">
                        JD
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    {isProfileOpen && (
                      <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 transform origin-top-right transition-all">
                        <div className="px-4 py-3 border-b border-slate-100 mb-2">
                          <p className="text-sm font-semibold text-slate-900">
                            John Doe
                          </p>
                          <p className="text-xs text-slate-500 truncate">
                            john@example.com
                          </p>
                        </div>
                        <a
                          href="#account"
                          className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-violet-600 transition-colors"
                        >
                          <User className="w-4 h-4 mr-3 text-slate-400" />
                          My Profile
                        </a>
                        <a
                          href="#settings"
                          className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-violet-600 transition-colors"
                        >
                          <Settings className="w-4 h-4 mr-3 text-slate-400" />
                          Settings
                        </a>
                        <div className="h-px bg-slate-100 my-2"></div>
                        <button
                          onClick={() => {
                            onLogout();
                            setIsProfileOpen(false);
                          }}
                          className="w-full flex items-center px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4 mr-3 text-rose-500" />
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={onOpenAuth}
                    className="flex items-center text-slate-600 hover:text-violet-600 font-medium text-sm transition-colors"
                  >
                    <User className="w-4 h-4 mr-1.5" />
                    Sign In
                  </button>
                )}
              </>
            ) : (
              <button
                onClick={() => setIsMenuOpen(true)}
                className="text-slate-600 hover:text-violet-600 focus:outline-none"
              >
                <Menu className="h-6 w-6" />
              </button>
            )}

            {!isProductPage && (
              <button
                onClick={onOpenCart}
                className="relative p-2 text-slate-600 hover:text-violet-600 transition-colors group"
              >
                <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-gradient-primary rounded-full shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-4">
            <button
              onClick={onOpenCart}
              className="relative p-2 text-slate-600 hover:text-violet-600"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-gradient-primary rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(true)}
              className="text-slate-600 hover:text-violet-600 focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>

    {/* Unified Mobile Sidebar */}
    {isMenuOpen && (
      <div className="fixed inset-0 z-[100]">
        {/* Dark semi-transparent overlay */}
        <div
          className="absolute inset-0 bg-black/60 transition-opacity"
          onClick={() => setIsMenuOpen(false)}
        />
        
        {isProductPage ? (
          /* Sidebar for Product Page */
          <div className="absolute inset-y-0 left-0 w-[80%] sm:w-[300px] bg-[#121212] shadow-2xl transform transition-transform duration-300 flex flex-col">
            {/* Sidebar Header */}
            <div className="px-5 py-4 flex items-center justify-between border-b border-white/10">
              <span className="text-2xl font-display font-bold tracking-tight text-white uppercase">
                ENTERPEDIA
              </span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-white hover:text-gray-300 focus:outline-none p-1"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            {/* Sidebar Content */}
            <div className="flex-1 py-4 flex flex-col">
              <button
                onClick={() => {
                  onGoHome();
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center px-5 py-3 text-white hover:bg-[#2a2a2a] transition-colors"
              >
                <Home className="h-5 w-5 text-white" strokeWidth={2} />
                <span className="text-sm font-semibold ml-4 font-sans">Home</span>
              </button>

              <button
                onClick={() => {
                  onShowProducts();
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center px-5 py-3 text-white hover:bg-[#2a2a2a] transition-colors"
              >
                <Folder className="h-5 w-5 text-white" strokeWidth={2} />
                <span className="text-sm font-semibold ml-4 font-sans">Samples</span>
              </button>

              <button
                onClick={() => {
                  onShowSaved();
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center px-5 py-3 text-white hover:bg-[#2a2a2a] transition-colors"
              >
                <Bookmark className="h-5 w-5 text-white" strokeWidth={2} />
                <span className="text-sm font-semibold ml-4 font-sans">Saved</span>
              </button>

              <button
                onClick={() => {
                  onShowRequest();
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center px-5 py-3 text-white hover:bg-[#2a2a2a] transition-colors"
              >
                <Lightbulb className="h-5 w-5 text-white" strokeWidth={2} />
                <span className="text-sm font-semibold ml-4 font-sans">Product Request</span>
              </button>

              <div className="px-5 my-2">
                <div className="h-px bg-white/10 w-full"></div>
              </div>

              <button
                className="w-full flex items-center px-5 py-3 text-white hover:bg-[#2a2a2a] transition-colors"
              >
                <Crown className="h-5 w-5 text-white" strokeWidth={2} />
                <span className="text-sm font-semibold ml-4 font-sans">Member Benefits</span>
              </button>
            </div>
          </div>
        ) : (
          /* Top-down Menu for Landing Page */
          <div className="absolute inset-x-0 top-0 w-full bg-white shadow-2xl transform transition-transform duration-300 flex flex-col p-5">
            <div className="flex justify-end items-center mb-6">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-slate-900 hover:text-slate-600 focus:outline-none p-1"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex flex-col items-start space-y-4">
              <button onClick={() => { onGoHome(); setIsMenuOpen(false); }} className="text-lg font-medium text-slate-900 text-left">Home page</button>
              <button onClick={() => { onShowProducts(); setIsMenuOpen(false); }} className="text-lg font-medium text-slate-900 text-left">Shop All</button>
              <button onClick={() => { onOpenContact(); setIsMenuOpen(false); }} className="text-lg font-medium text-slate-900 text-left">Contact us</button>
              <div className="h-px bg-slate-200 my-2 w-full"></div>
              {!isLoggedIn ? (
                <button onClick={() => { onOpenAuth(); setIsMenuOpen(false); }} className="text-lg font-medium text-violet-600 text-left">Login or Signup</button>
              ) : (
                <button onClick={() => { onLogout(); setIsMenuOpen(false); }} className="text-lg font-medium text-rose-600 text-left">Logout</button>
              )}
            </div>
          </div>
        )}
      </div>
    )}
    </>
  );
}
