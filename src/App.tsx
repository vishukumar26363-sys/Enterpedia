import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Bookmark, X, Check, ClipboardList, ArrowDown, Library, Lock, Shield, Calendar } from "lucide-react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductGrid from "./components/ProductGrid";
import CartModal from "./components/CartModal";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";
import LicenseModal from "./components/LicenseModal";
import ContactModal from "./components/ContactModal";
import FaqModal from "./components/FaqModal";
import PrivacyPolicyModal from "./components/PrivacyPolicyModal";
import RefundPolicyModal from "./components/RefundPolicyModal";
import TermsOfServiceModal from "./components/TermsOfServiceModal";
import WelcomeGift from "./components/WelcomeGift";
import ProductDetails from "./components/ProductDetails";
import ProductCard from "./components/ProductCard";
import PaymentSimulationModal from "./components/PaymentSimulationModal";
import SalesNotification from "./components/SalesNotification";
import { WelcomeGiftProvider } from "./context/WelcomeGiftContext";
import { products } from "./data";
import { plannedItems } from "./roadmapData";
import { Product, CartItem } from "./types";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

const trendingTopics = [
  { title: "10,000+ Viral Shorts Bundle", description: "High-quality viral video clips for Instagram and TikTok without any watermarks.", votes: 89, status: "Planned" },
  { title: "Scale Facebook Ads 2026", description: "The ultimate 1-1-1 framework to scale your business using Meta's latest Advantage+ updates.", votes: 74, status: "In Progress" },
  { title: "AI-Powered CRM Template", description: "A complete Firebase-based CRM to manage your agency clients and leads automatically.", votes: 62, status: "Planned" },
  { title: "Email Marketing PLR", description: "Over 500+ high-converting email scripts for every niche to boost your open rates.", votes: 58, status: "Completed" },
  { title: "Neuromarketing Psychology", description: "Learn the secret psychological triggers that shape buying decisions and boost sales.", votes: 51, status: "Planned" },
  { title: "SaaS Mobile UI Kit", description: "50+ editable Figma screens designed specifically for modern SaaS mobile applications.", votes: 45, status: "In Progress" },
  { title: "Substack Growth Guide", description: "A full suite of products to support writers with understanding and thriving on Substack.", votes: 42, status: "Planned" },
  { title: "Door Knocking Sales Guide", description: "The ultimate guide to confidently knocking on doors and closing high-ticket sales.", votes: 38, status: "Planned" },
  { title: "Heartbreak Recovery for Women", description: "An interactive roadmap guiding women through emotional healing and self-discovery.", votes: 35, status: "In Progress" },
  { title: "Google Tag Manager Pro", description: "Master advanced tracking, tags, and triggers for reporting excellence.", votes: 31, status: "Planned" },
  { title: "Financial Freedom Ebook", description: "Discover 50 proven passive income streams to achieve financial independence in 2026.", votes: 92, status: "Completed" },
  { title: "Headhunter Toolkit", description: "Professional recruitment tools and strategies to start your own headhunting agency.", votes: 29, status: "Planned" },
  { title: "Testosterone Blueprint", description: "Actionable science-based steps for diet and exercise to naturally optimize health.", votes: 47, status: "In Progress" },
  { title: "SaaS Trust & Certification", description: "Step-by-step guide to strengthening your SaaS security with SOC 2 and ISO compliance.", votes: 26, status: "Planned" },
  { title: "Vulnerability Vault", description: "Transform perceived weaknesses into strengths for deeper personal and professional connections.", votes: 22, status: "Planned" },
  { title: "Zero to Hero Crypto Guide", description: "A complete roadmap for beginners to understand blockchain and smart trading.", votes: 55, status: "In Progress" },
  { title: "Automated Dropshipping", description: "Setting up AI-driven workflows to automate your Shopify store from order to delivery.", votes: 68, status: "Planned" },
  { title: "Instagram Branding Mastery", description: "Proven strategies to grow from 0 to 100k followers with organic branding.", votes: 81, status: "Completed" },
  { title: "Cold Email Outreach", description: "The exact scripts and systems used to land $1000+ high-ticket clients consistently.", votes: 49, status: "In Progress" },
  { title: "Custom Invoice Generator", description: "A lightweight tool for small business owners to generate and manage professional invoices.", votes: 33, status: "Planned" },
];

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [votes, setVotes] = useState(trendingTopics.map(t => t.votes));
  const [activeCategory, setActiveCategory] = useState<'Ideas' | 'Planned' | 'Rejected'>('Ideas');

  // Handle Order Approval via URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const approveId = urlParams.get('approve');
    if (approveId) {
      const approveOrder = async () => {
        try {
          await updateDoc(doc(db, "orders", approveId), {
            status: "approved"
          });
          alert("Order Approved Successfully!");
          // Clean up URL
          window.history.replaceState({}, document.title, "/");
        } catch (error) {
          console.error("Error approving order:", error);
        }
      };
      approveOrder();
    }
  }, []);

  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null,
  );
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const [isPrivacyPolicyModalOpen, setIsPrivacyPolicyModalOpen] = useState(false);
  const [isRefundPolicyModalOpen, setIsRefundPolicyModalOpen] = useState(false);
  const [isTermsOfServiceModalOpen, setIsTermsOfServiceModalOpen] = useState(false);
  const [showProducts, setShowProducts] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('page') === 'samples';
  });
  const [showSamplesPage, setShowSamplesPage] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [showRequestPage, setShowRequestPage] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false); // Mock subscription state
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [isRequestFormOpen, setIsRequestFormOpen] = useState(false);
  const [savedItems, setSavedItems] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  useEffect(() => {
    if (showSaved) {
      const savedIds = JSON.parse(localStorage.getItem('savedProducts') || '[]');
      const savedProducts = products.filter(p => savedIds.includes(p.id));
      setSavedItems(savedProducts);
    }
  }, [showSaved, products]);

  const [downloadProduct, setDownloadProduct] = useState<Product | null>(null);

  const isLoggedIn = user !== null;

  const handleAddToCart = (product: Product) => {
    if (!isLoggedIn) {
      setIsAuthModalOpen(true);
      return;
    }

    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.product.id === product.id,
      );
      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevItems, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId),
    );
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const handleLogin = (name: string, email: string) => {
    setUser({ name, email });
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    setCartItems([]);
  };

  const handleDownloadRequest = (product: Product) => {
    setDownloadProduct(product);
    setIsPaymentModalOpen(true);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <WelcomeGiftProvider>
      <div className="min-h-screen flex flex-col font-sans text-slate-900">
        <WelcomeGift />
        <SalesNotification />
        <Navbar
          cartCount={cartCount}
          onOpenCart={() => setIsCartOpen(true)}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isLoggedIn={isLoggedIn}
          onOpenAuth={() => setIsAuthModalOpen(true)}
          onLogout={handleLogout}
          onGoHome={() => {
            setShowProducts(false);
            setShowSamplesPage(false);
            setShowSaved(false);
            setShowRequestPage(false);
            setSelectedProduct(null);
          }}
          onShowProducts={() => {
            setShowSamplesPage(true);
            setShowProducts(false);
            setShowSaved(false);
            setShowRequestPage(false);
            setSelectedProduct(null);
          }}
          onShowSaved={() => {
            setShowSaved(true);
            setShowSamplesPage(false);
            setShowProducts(false);
            setShowRequestPage(false);
            setSelectedProduct(null);
          }}
          onShowRequest={() => {
            setShowRequestPage(true);
            setShowSaved(false);
            setShowSamplesPage(false);
            setShowProducts(false);
            setSelectedProduct(null);
          }}
          onOpenContact={() => setIsContactModalOpen(true)}
          isProductPage={showProducts || !!selectedProduct || showSamplesPage || showSaved || showRequestPage}
        />

        <main className="flex-grow">
          <div id="home-page" style={{ display: !showSamplesPage && !showSaved && !showRequestPage ? 'block' : 'none' }}>
            {selectedProduct ? (
              <ProductDetails
                product={selectedProduct}
                onBack={() => setSelectedProduct(null)}
                onAddToCart={handleAddToCart}
                onDownload={handleDownloadRequest}
              />
            ) : !showProducts ? (
              <Hero
                isLoggedIn={isLoggedIn}
                onOpenAuth={() => setIsAuthModalOpen(true)}
                onShowProducts={() => setShowProducts(true)}
                onOpenLicense={() => setIsLicenseModalOpen(true)}
              />
            ) : (
              <ProductGrid
                products={products}
                onAddToCart={handleAddToCart}
                onOpenProduct={(product) => setSelectedProduct(product)}
                onDownload={handleDownloadRequest}
                searchTerm={searchTerm}
              />
            )}
          </div>

          <div id="samples-page" style={{ display: showSamplesPage ? 'block' : 'none', background: 'white', width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 100, overflowY: 'auto' }}>
            <div className="max-w-7xl mx-auto p-4">
              
              <div className="flex flex-col items-center justify-center mt-10 px-4">
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 text-gray-600 text-xs mb-6">
                  <span>🔭</span>
                  <span>Preview Before Purchase</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-extrabold text-black mb-6 text-center">
                  Enterpedia Samples
                </h1>
                
                <p className="text-gray-600 text-center max-w-[320px]">
                  Explore professionally designed digital assets. These are fully editable and ready to help you grow your brand, sell faster, and deliver more value.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
                <div className="col-span-full mb-2 mt-6">
                  <button
                    onClick={() => {
                      setShowSamplesPage(false);
                      setShowProducts(true);
                    }}
                    className="flex items-center gap-2 text-slate-500 hover:text-black transition-colors text-sm"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Library</span>
                  </button>
                </div>
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onOpenProduct={setSelectedProduct}
                    onDownload={handleDownloadRequest}
                  />
                ))}
              </div>
            </div>
          </div>

          <div id="saved-page" style={{ display: showSaved ? 'block' : 'none', background: 'white', width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 100, overflowY: 'auto' }}>
            <div className="max-w-7xl mx-auto p-4">
              
              <div className="flex flex-col items-center justify-center mt-10 px-4">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 bg-slate-50 text-xs text-slate-500 mb-6">
                  <Bookmark className="h-3 w-3" />
                  <span>Your favorites</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-extrabold text-black mb-6 text-center">
                  Saved Products
                </h1>
                
                <p className="text-gray-600 text-center max-w-[320px]">
                  Your collection of bookmarked digital products
                </p>
              </div>

              {savedItems.length === 0 ? (
                <div className="border border-slate-200 rounded-2xl p-20 text-center max-w-2xl mx-auto">
                  <p className="font-bold text-slate-900 mb-2">No saved products yet</p>
                  <p className="text-slate-500 text-sm">Products you bookmark will appear here for easy access.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {savedItems.map(item => (
                     <div key={item.id} className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow relative">
                       <button
                         onClick={() => {
                           const saved = localStorage.getItem('savedProducts');
                           let savedArray = saved ? JSON.parse(saved) : [];
                           savedArray = savedArray.filter((id: string) => id !== item.id);
                           localStorage.setItem('savedProducts', JSON.stringify(savedArray));
                           window.dispatchEvent(new CustomEvent('savedProductsChanged'));
                           setSavedItems(savedItems.filter(p => p.id !== item.id));
                         }}
                         className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm border border-slate-100 hover:bg-slate-50"
                       >
                         <Bookmark className="h-4 w-4 fill-black text-black" />
                       </button>
                       <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                       <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                       <p className="text-violet-600 font-semibold">₹{item.price.toFixed(0)}</p>
                     </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>

        <div id="product-request-page" style={{ display: showRequestPage ? 'block' : 'none', background: '#f9fafb', width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 100, overflowY: 'auto' }}>
          <div className="max-w-7xl mx-auto p-4 relative min-h-screen">
            <button 
              onClick={() => setShowRequestPage(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="pt-20 pb-10 px-4 flex flex-col items-center">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 bg-slate-50 text-xs text-slate-500 mb-6 font-medium">
                <span>✉️</span>
                <span>Custom Request</span>
              </div>
              
              <h1 className="text-4xl font-extrabold text-black tracking-tight mb-6">
                Product Request
              </h1>
              
              <p className="text-gray-500 text-center max-w-2xl mb-12 text-lg">
                Have a specific digital product in mind? Tell us what you need and our team will build it for the community.
              </p>
              
              <button
                onClick={() => {
                  if (isSubscribed) {
                    setIsRequestFormOpen(true);
                  } else {
                    setIsUpgradeModalOpen(true);
                  }
                }}
                className="w-full max-w-md px-8 py-4 bg-[#E57373] text-white rounded-lg font-bold text-lg hover:bg-[#d46a6a] transition-colors shadow-md mb-8"
              >
                Submit Ideas
              </button>

              <div className="flex justify-start gap-8 mb-12 border-b border-gray-200 pb-2 mt-8 w-full">
                <button 
                  onClick={() => setActiveCategory('Ideas')}
                  className={`text-sm font-medium pb-2 ${activeCategory === 'Ideas' ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  Ideas (20)
                </button>
                <button 
                  onClick={() => setActiveCategory('Planned')}
                  className={`text-sm font-medium pb-2 ${activeCategory === 'Planned' ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  Planned (50)
                </button>
                <button 
                  onClick={() => setActiveCategory('Rejected')}
                  className={`text-sm font-medium pb-2 ${activeCategory === 'Rejected' ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  Rejected (0)
                </button>
              </div>
              
              {activeCategory === 'Ideas' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                  {trendingTopics.map((topic, index) => (
                    <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex gap-4 hover:shadow-md transition-shadow">
                      <button 
                        onClick={() => {
                          if (isSubscribed) {
                            const newVotes = [...votes];
                            newVotes[index]++;
                            setVotes(newVotes);
                          } else {
                            setIsUpgradeModalOpen(true);
                          }
                        }}
                        className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-2 min-w-[60px] hover:bg-gray-100 transition-colors"
                      >
                        <ArrowDown className="h-5 w-5 text-gray-400 rotate-180" />
                        <span className="font-bold text-lg text-gray-900">{votes[index]}</span>
                      </button>
                      <div className="flex-1 relative">
                        <h3 className="font-bold text-lg text-gray-900 mb-1">{topic.title}</h3>
                        <p className="text-gray-500 text-sm">{topic.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : activeCategory === 'Planned' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  {plannedItems.map((item, index) => (
                    <div 
                      key={index} 
                      onClick={() => setIsUpgradeModalOpen(true)}
                      className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex gap-4 hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="flex items-center justify-center bg-blue-50 rounded-lg p-3 min-w-[50px] h-[50px]">
                        <Calendar className="h-6 w-6 text-blue-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900 mb-1">{item.title}</h3>
                        <p className="text-gray-500 text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 flex flex-col items-center justify-center text-center w-full">
                  <div className="bg-gray-100 rounded-full p-4 mb-4">
                    <X className="h-8 w-8 text-gray-500" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-1">No rejected requests</h3>
                  <p className="text-gray-400 text-sm">Ideas that don't fit our roadmap or vision will be listed here</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Upgrade Modal */}
        <AnimatePresence>
          {isUpgradeModalOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                className="bg-white rounded-[24px] p-8 max-w-sm w-full relative shadow-2xl"
              >
                <button onClick={() => setIsUpgradeModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-black">
                  <X className="h-5 w-5" />
                </button>
                
                <div className="text-center mb-6">
                  <div className="inline-block px-3 py-1 bg-gray-100 rounded-full text-[10px] font-bold text-gray-600 tracking-wider mb-4">
                    👑 PREMIUM FEATURE
                  </div>
                  <h2 className="text-2xl font-extrabold text-black mb-3">Upgrade to Submit Ideas</h2>
                  <p className="text-gray-500 text-sm mx-auto max-w-[300px]">Submitting product ideas is a premium feature. Upgrade your plan to share your innovative ideas with our community.</p>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-800 font-medium">
                    <Check className="h-4 w-4 text-black" /> Submit unlimited product ideas
                  </div>
                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-[10px] uppercase tracking-widest text-gray-400">
                      <span className="bg-white px-2">PLUS GET EVERYTHING ELSE</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-gray-600">
                    <div className="flex flex-col items-center gap-1">
                      <div className="p-2 bg-gray-50 rounded-lg"><ArrowDown className="h-4 w-4" /></div>
                      Unlimited Downloads
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="p-2 bg-gray-50 rounded-lg"><Library className="h-4 w-4" /></div>
                      Full Library Access
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="p-2 bg-gray-50 rounded-lg"><Lock className="h-4 w-4" /></div>
                      PLR License
                    </div>
                  </div>
                </div>

                <a
                  href="/pricing"
                  className="block w-full text-center px-6 py-3 bg-[#E11D48] text-white rounded-lg font-bold hover:bg-[#BE123C] transition-colors mb-4"
                >
                  See pricing plans →
                </a>
                
                <div className="flex items-center justify-center gap-1 text-[10px] text-gray-400 mb-4">
                  <Shield className="h-3 w-3" /> Secure checkout • Lifetime access
                </div>
                
                <button
                  onClick={() => setIsUpgradeModalOpen(false)}
                  className="block w-full text-center text-xs text-gray-400 underline"
                >
                  Maybe later
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Request Form Modal */}
        <AnimatePresence>
          {isRequestFormOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                className="bg-white rounded-2xl p-8 max-w-md w-full relative shadow-2xl"
              >
                <button onClick={() => setIsRequestFormOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-black">
                  <X className="h-6 w-6" />
                </button>
                <h2 className="text-2xl font-bold mb-6 text-black">Submit Your Idea</h2>
                <form onSubmit={(e) => { e.preventDefault(); setIsRequestFormOpen(false); alert('Request sent to team!'); }}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Idea Title</label>
                    <input type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Enter your idea title" />
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Describe your product request</label>
                    <textarea required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-32" placeholder="Tell us more about what you need..."></textarea>
                  </div>
                  <button type="submit" className="w-full py-3 bg-black text-white rounded-lg font-bold hover:bg-gray-800 transition-colors">
                    Send to Team
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Footer 
          onOpenContact={() => setIsContactModalOpen(true)} 
          onOpenFaq={() => setIsFaqModalOpen(true)}
          onOpenPrivacyPolicy={() => setIsPrivacyPolicyModalOpen(true)}
          onOpenTermsOfService={() => setIsTermsOfServiceModalOpen(true)}
          onOpenRefundPolicy={() => setIsRefundPolicyModalOpen(true)}
        />

        <CartModal
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onRemoveItem={handleRemoveItem}
          onUpdateQuantity={handleUpdateQuantity}
        />

        <PaymentSimulationModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          product={downloadProduct}
        />

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onLogin={handleLogin}
        />

        <LicenseModal
          isOpen={isLicenseModalOpen}
          onClose={() => setIsLicenseModalOpen(false)}
        />

        <ContactModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
        />

        <FaqModal
          isOpen={isFaqModalOpen}
          onClose={() => setIsFaqModalOpen(false)}
        />

        <PrivacyPolicyModal
          isOpen={isPrivacyPolicyModalOpen}
          onClose={() => setIsPrivacyPolicyModalOpen(false)}
        />

        <TermsOfServiceModal
          isOpen={isTermsOfServiceModalOpen}
          onClose={() => setIsTermsOfServiceModalOpen(false)}
        />

        <RefundPolicyModal
          isOpen={isRefundPolicyModalOpen}
          onClose={() => setIsRefundPolicyModalOpen(false)}
        />
      </div>
    </WelcomeGiftProvider>
  );
}
