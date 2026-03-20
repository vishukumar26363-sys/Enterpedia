import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Bookmark, X, Check, ClipboardList, ArrowDown, Library, Lock, Shield, Calendar, Crown, Database, Users, Phone, Zap, Play, Rocket, Globe, Lightbulb, Search, Folder, Wand2, FileEdit } from "lucide-react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductGrid from "./components/ProductGrid";
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
import { marketGapsData } from "./marketGapsData";
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
  const [showMemberHub, setShowMemberHub] = useState(false);
  const [showMarketGaps, setShowMarketGaps] = useState(false);
  const [showProductIdeas, setShowProductIdeas] = useState(false);
  const [showBookTitleGenerator, setShowBookTitleGenerator] = useState(false);
  const [activeItem, setActiveItem] = useState('home');

  // Market Gaps State
  const [gapSearch, setGapSearch] = useState('');
  const [gapIndustry, setGapIndustry] = useState('All Industries');
  const [gapPotential, setGapPotential] = useState('Profit Potential');
  const [gapDifficulty, setGapDifficulty] = useState('Difficulty');
  const [gapPage, setGapPage] = useState(1);
  const [selectedGap, setSelectedGap] = useState<any>(null);
  const gapsPerPage = 12;

  // Filtered Gaps Logic
  const filteredGaps = marketGapsData.filter(gap => {
    const matchesSearch = gap.title.toLowerCase().includes(gapSearch.toLowerCase()) || 
                         gap.id.toLowerCase().includes(gapSearch.toLowerCase());
    const matchesIndustry = gapIndustry === 'All Industries' || gap.industry === gapIndustry;
    const matchesPotential = gapPotential === 'Profit Potential' || gap.potential === gapPotential;
    const matchesDifficulty = gapDifficulty === 'Difficulty' || gap.difficulty === gapDifficulty;
    
    return matchesSearch && matchesIndustry && matchesPotential && matchesDifficulty;
  });

  const totalPages = Math.ceil(filteredGaps.length / gapsPerPage);
  const currentGaps = filteredGaps.slice((gapPage - 1) * gapsPerPage, gapPage * gapsPerPage);

  const [isSubscribed, setIsSubscribed] = useState(false); // Mock subscription state
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [isRequestFormOpen, setIsRequestFormOpen] = useState(false);
  const [savedItems, setSavedItems] = useState<Product[]>([]);
  const [savedGaps, setSavedGaps] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  useEffect(() => {
    if (showSaved) {
      const savedIds = JSON.parse(localStorage.getItem('savedProducts') || '[]');
      const savedProducts = products.filter(p => savedIds.includes(p.id));
      setSavedItems(savedProducts);

      const savedGapIds = JSON.parse(localStorage.getItem('savedGaps') || '[]');
      const savedGapsList = marketGapsData.filter(g => savedGapIds.includes(g.id));
      setSavedGaps(savedGapsList);
    }
  }, [showSaved, products]);

  // Trigger upgrade modal after 5 seconds on Market Gaps page for free users
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (showMarketGaps && !isSubscribed) {
      timeoutId = setTimeout(() => {
        setIsUpgradeModalOpen(true);
      }, 5000);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [showMarketGaps, isSubscribed]);

  const handleDownloadReport = (gap: any) => {
    if (!isSubscribed) {
      setIsUpgradeModalOpen(true);
      return;
    }
    const reportContent = `
ENTERPEDIA CONFIDENTIAL - RESEARCH REPORT
==========================================
ID: ${gap.id}
TITLE: ${gap.title}
STATUS: ${gap.status}
MARKET SIZE: ${gap.market}
INDUSTRY: ${gap.industry}
DIFFICULTY: ${gap.difficulty}
POTENTIAL: ${gap.potential}

${Object.values(gap.sections).map((section: any) => `
${section.heading}
------------------------------------------
${section.content}
`).join('\n')}

==========================================
WATERMARK: ENTERPEDIA CONFIDENTIAL
Generated on: ${new Date().toLocaleString()}
© 2026 Enterpedia. All rights reserved.
    `;
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Enterpedia_Research_Report_${gap.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSaveGap = (gap: any) => {
    const savedGapIds = JSON.parse(localStorage.getItem('savedGaps') || '[]');
    if (!savedGapIds.includes(gap.id)) {
      const newSavedIds = [...savedGapIds, gap.id];
      localStorage.setItem('savedGaps', JSON.stringify(newSavedIds));
      alert('Gap saved to your library!');
    } else {
      alert('This gap is already in your library.');
    }
  };

  const [downloadProduct, setDownloadProduct] = useState<Product | null>(null);

  const isLoggedIn = user !== null;

  const handleLogin = (name: string, email: string) => {
    setUser({ name, email });
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleDownloadRequest = (product: Product) => {
    setDownloadProduct(product);
    setIsPaymentModalOpen(true);
  };

  return (
    <WelcomeGiftProvider>
      <div className="min-h-screen flex flex-col font-sans text-slate-900">
        <WelcomeGift />
        <SalesNotification />
        <Navbar
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
            setShowMemberHub(false);
            setShowMarketGaps(false);
            setShowProductIdeas(false);
            setShowBookTitleGenerator(false);
            setSelectedProduct(null);
            setActiveItem('home');
          }}
          onShowProducts={() => {
            setShowProducts(true);
            setShowSamplesPage(false);
            setShowSaved(false);
            setShowRequestPage(false);
            setShowMemberHub(false);
            setShowMarketGaps(false);
            setShowProductIdeas(false);
            setShowBookTitleGenerator(false);
            setSelectedProduct(null);
            setActiveItem('products');
          }}
          onShowSamples={() => {
            setShowSamplesPage(true);
            setShowProducts(false);
            setShowSaved(false);
            setShowRequestPage(false);
            setShowMemberHub(false);
            setShowMarketGaps(false);
            setShowProductIdeas(false);
            setShowBookTitleGenerator(false);
            setSelectedProduct(null);
            setActiveItem('samples');
          }}
          onShowSaved={() => {
            setShowSaved(true);
            setShowSamplesPage(false);
            setShowProducts(false);
            setShowRequestPage(false);
            setShowMemberHub(false);
            setShowMarketGaps(false);
            setShowProductIdeas(false);
            setShowBookTitleGenerator(false);
            setSelectedProduct(null);
            setActiveItem('saved');
          }}
          onShowRequest={() => {
            setShowRequestPage(true);
            setShowMemberHub(false);
            setShowSaved(false);
            setShowSamplesPage(false);
            setShowProducts(false);
            setShowMarketGaps(false);
            setShowProductIdeas(false);
            setShowBookTitleGenerator(false);
            setSelectedProduct(null);
            setActiveItem('request');
          }}
          onShowMemberHub={() => {
            if (!isSubscribed) {
              setIsUpgradeModalOpen(true);
              // CRITICAL: Do not set showMemberHub(true) for free users
              // Background remains whatever it was
            } else {
              setActiveItem('memberhub');
              setShowMemberHub(true);
              setShowMarketGaps(false);
              setShowRequestPage(false);
              setShowSaved(false);
              setShowSamplesPage(false);
              setShowProducts(false);
              setShowProductIdeas(false);
              setShowBookTitleGenerator(false);
              setSelectedProduct(null);
            }
          }}
          onShowMarketGaps={() => {
            setActiveItem('marketgaps');
            // Temporarily disabled gate to show the page
            setShowMarketGaps(true);
            setShowMemberHub(false);
            setShowRequestPage(false);
            setShowSaved(false);
            setShowSamplesPage(false);
            setShowProducts(false);
            setShowProductIdeas(false);
            setShowBookTitleGenerator(false);
            setSelectedProduct(null);
          }}
          onShowProductIdeas={() => {
            setActiveItem('productideas');
            setShowProductIdeas(true);
            setShowBookTitleGenerator(false);
            setShowMarketGaps(false);
            setShowMemberHub(false);
            setShowRequestPage(false);
            setShowSaved(false);
            setShowSamplesPage(false);
            setShowProducts(false);
            setSelectedProduct(null);
          }}
          onShowBookTitleGenerator={() => {
            setActiveItem('booktitlegenerator');
            setShowBookTitleGenerator(true);
            setShowProductIdeas(false);
            setShowMarketGaps(false);
            setShowMemberHub(false);
            setShowRequestPage(false);
            setShowSaved(false);
            setShowSamplesPage(false);
            setShowProducts(false);
            setSelectedProduct(null);
          }}
          onOpenUpgradeModal={() => setIsUpgradeModalOpen(true)}
          onOpenContact={() => setIsContactModalOpen(true)}
          activeItem={activeItem}
          isProductPage={showProducts || !!selectedProduct || showSamplesPage || showSaved || showRequestPage || showMemberHub || showMarketGaps || showProductIdeas || showBookTitleGenerator}
        />

        <main className="flex-grow">
          <div id="home-page" style={{ display: !showSamplesPage && !showSaved && !showRequestPage && !showMemberHub && !showMarketGaps && !showProductIdeas && !showBookTitleGenerator ? 'block' : 'none' }}>
            {selectedProduct ? (
              <ProductDetails
                product={selectedProduct}
                onBack={() => setSelectedProduct(null)}
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
                onOpenProduct={(product) => setSelectedProduct(product)}
                onDownload={handleDownloadRequest}
                searchTerm={searchTerm}
              />
            )}
          </div>

          <div id="samples-page" style={{ display: showSamplesPage ? 'block' : 'none', background: 'white', minHeight: '100vh', paddingTop: '80px' }}>
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
                    onOpenProduct={setSelectedProduct}
                    onDownload={handleDownloadRequest}
                  />
                ))}
              </div>
            </div>
          </div>

          <div id="saved-page" style={{ display: showSaved ? 'block' : 'none', background: 'white', minHeight: '100vh', paddingTop: '80px' }}>
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

              {savedItems.length === 0 && savedGaps.length === 0 ? (
                <div className="border border-slate-200 rounded-2xl p-20 text-center max-w-2xl mx-auto">
                  <p className="font-bold text-slate-900 mb-2">No saved items yet</p>
                  <p className="text-slate-500 text-sm">Products and Market Gaps you bookmark will appear here for easy access.</p>
                </div>
              ) : (
                <div className="space-y-12">
                  {savedItems.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-2">
                        <Bookmark className="h-6 w-6 text-violet-500" />
                        Saved Products
                      </h2>
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
                               className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm border border-slate-100 hover:bg-slate-50 z-10"
                             >
                               <Bookmark className="h-4 w-4 fill-black text-black" />
                             </button>
                             <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                             <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                             <p className="text-violet-600 font-semibold">₹{item.price.toFixed(0)}</p>
                           </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {savedGaps.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-2">
                        <Search className="h-6 w-6 text-emerald-500" />
                        Saved Market Gaps
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {savedGaps.map(gap => (
                          <div key={gap.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all group relative">
                            <button
                              onClick={() => {
                                const saved = localStorage.getItem('savedGaps');
                                let savedArray = saved ? JSON.parse(saved) : [];
                                savedArray = savedArray.filter((id: string) => id !== gap.id);
                                localStorage.setItem('savedGaps', JSON.stringify(savedArray));
                                setSavedGaps(savedGaps.filter(g => g.id !== gap.id));
                              }}
                              className="absolute top-4 right-4 p-1.5 bg-white rounded-full shadow-sm border border-gray-100 hover:bg-gray-50 z-10"
                            >
                              <Bookmark className="h-4 w-4 fill-emerald-500 text-emerald-500" />
                            </button>
                            <div className="flex justify-between items-start mb-4">
                              <span className="text-[10px] font-bold text-gray-400 tracking-widest">{gap.id}</span>
                              <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${gap.status === 'Unsolved' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                {gap.status}
                              </span>
                            </div>
                            <h3 className="font-bold text-base text-black mb-3 leading-tight group-hover:text-[#F15B5B] transition-colors">
                              {gap.title}
                            </h3>
                            <div className="flex items-center gap-2 mb-5">
                              <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                              <span className="text-xs font-bold text-gray-500">{gap.market}</span>
                            </div>
                            <button 
                              onClick={() => {
                                setSelectedGap(gap);
                                setShowMarketGaps(true);
                                setShowSaved(false);
                              }}
                              className="w-full py-2.5 rounded-xl border-2 border-[#F15B5B] text-[#F15B5B] text-xs font-bold hover:bg-[#F15B5B] hover:text-white transition-all"
                            >
                              View Strategy
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>

        <div id="product-request-page" style={{ display: showRequestPage ? 'block' : 'none', background: '#f9fafb', minHeight: '100vh', paddingTop: '80px' }}>
          <div className="max-w-7xl mx-auto p-4 relative min-h-screen">
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

        <div id="member-hub-page" style={{ display: showMemberHub ? 'block' : 'none', background: '#f8fafc', minHeight: '100vh', paddingTop: '80px' }}>
          <AnimatePresence>
            {showMemberHub && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-7xl mx-auto p-4 relative min-h-screen"
              >
                <div className="pt-20 pb-10 px-4">
                  <div className="flex flex-col items-center mb-12">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 bg-slate-50 text-xs text-slate-500 mb-6 font-medium">
                      <Crown className="h-3 w-3 text-amber-500" />
                      <span>Member Dashboard</span>
                    </div>
                    <h1 className="text-4xl font-extrabold text-black tracking-tight mb-4">Member Hub</h1>
                    <p className="text-gray-500 text-center max-w-2xl text-lg">
                      Manage your subscription, access premium resources, and grow your business with exclusive member benefits.
                    </p>
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Plan Type</p>
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold text-slate-900">{isSubscribed ? 'Pro Plan' : 'Free Plan'}</h3>
                        <span className={`px-2 py-1 rounded text-[10px] font-bold ${isSubscribed ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
                          {isSubscribed ? 'ACTIVE' : 'BASIC'}
                        </span>
                      </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Subscription Value</p>
                      <h3 className="text-2xl font-bold text-slate-900">₹{isSubscribed ? '9,999' : '0'}</h3>
                      <p className="text-[10px] text-slate-400 mt-1">Total investment in growth</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Resource Load</p>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-2xl font-bold text-slate-900">{isSubscribed ? '85%' : '5%'}</h3>
                        <span className="text-[10px] text-slate-400">Vault Usage</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-1000 ${isSubscribed ? 'bg-violet-500 w-[85%]' : 'bg-slate-300 w-[5%]'}`}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Benefits Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { title: 'Digital Vault', icon: Database, color: 'violet' },
                      { title: 'Mastermind', icon: Users, color: 'blue' },
                      { title: 'Strategy Call', icon: Phone, color: 'emerald' },
                      { title: 'Viral Library', icon: Play, color: 'pink' },
                      { title: 'Ad-Free', icon: Zap, color: 'amber' },
                      { title: 'Beta Portal', icon: Rocket, color: 'indigo' },
                      { title: 'Growth Alpha', icon: Globe, color: 'cyan' },
                      { title: 'Product Request', icon: Lightbulb, color: 'red', special: true },
                    ].map((benefit, idx) => (
                      <div 
                        key={idx}
                        onClick={() => {
                          if (!isSubscribed) {
                            setIsUpgradeModalOpen(true);
                          } else {
                            if (benefit.title === 'Product Request') {
                              setShowRequestPage(true);
                              setShowMemberHub(false);
                            } else {
                              alert(`Opening ${benefit.title}...`);
                            }
                          }
                        }}
                        className={`group relative bg-white rounded-2xl p-6 shadow-sm border transition-all duration-300 cursor-pointer hover:shadow-md ${benefit.special ? 'border-[#F15B5B] hover:bg-[#F15B5B]/5' : 'border-slate-100 hover:border-violet-200'}`}
                      >
                        {!isSubscribed && (
                          <div className="absolute top-4 right-4">
                            <Lock className="h-4 w-4 text-slate-300 group-hover:text-slate-400 transition-colors" />
                          </div>
                        )}
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${benefit.special ? 'bg-[#F15B5B] text-white' : 'bg-slate-50 text-slate-600'}`}>
                          <benefit.icon className="h-6 w-6" />
                        </div>
                        <h3 className={`font-bold text-lg mb-2 ${benefit.special ? 'text-[#F15B5B]' : 'text-slate-900'}`}>{benefit.title}</h3>
                        <p className="text-slate-400 text-xs leading-relaxed">
                          Access exclusive {benefit.title.toLowerCase()} resources and tools to scale your business.
                        </p>
                        <button 
                          className={`mt-6 w-full py-2 rounded-lg text-xs font-bold transition-colors ${benefit.special ? 'bg-[#F15B5B] text-white hover:bg-[#d46a6a]' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
                        >
                          {isSubscribed ? 'Access Now' : 'Upgrade to Unlock'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div id="market-gaps-page" style={{ display: showMarketGaps ? 'block' : 'none', background: '#F4F7F6', minHeight: '100vh', paddingTop: '80px' }}>
          <AnimatePresence>
            {showMarketGaps && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-[1600px] mx-auto p-6 relative min-h-screen"
              >
                {/* Header Section */}
                <div className="pt-12 pb-8">
                  <div className="flex items-center gap-4 mb-2">
                    <h1 className="text-4xl font-[900] text-black tracking-tight">1000+ Evergreen Market Gaps</h1>
                    <div className="bg-black text-white px-3 py-1 rounded-full text-[11px] font-bold">
                      Total: {filteredGaps.length} Gaps Found
                    </div>
                  </div>
                  <p className="text-gray-500 text-lg font-medium">
                    The world's largest database of unsolved business problems.
                  </p>
                </div>

                {/* Advanced Filter & Search Bar */}
                <div className="flex flex-wrap gap-4 mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex-1 min-w-[300px] relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Search Gap..." 
                      value={gapSearch}
                      onChange={(e) => {
                        setGapSearch(e.target.value);
                        setGapPage(1);
                      }}
                      className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                    />
                  </div>
                  <select 
                    value={gapIndustry}
                    onChange={(e) => {
                      setGapIndustry(e.target.value);
                      setGapPage(1);
                    }}
                    className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 min-w-[160px] focus:outline-none"
                  >
                    <option>All Industries</option>
                    <option>SaaS</option>
                    <option>E-commerce</option>
                    <option>AI/ML</option>
                    <option>HealthTech</option>
                  </select>
                  <select 
                    value={gapPotential}
                    onChange={(e) => {
                      setGapPotential(e.target.value);
                      setGapPage(1);
                    }}
                    className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 min-w-[160px] focus:outline-none"
                  >
                    <option>Profit Potential</option>
                    <option>High ($1M+)</option>
                    <option>Very High ($10M+)</option>
                    <option>Unicorn ($1B+)</option>
                  </select>
                  <select 
                    value={gapDifficulty}
                    onChange={(e) => {
                      setGapDifficulty(e.target.value);
                      setGapPage(1);
                    }}
                    className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 min-w-[160px] focus:outline-none"
                  >
                    <option>Difficulty</option>
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>
                </div>

                {/* High-Density Data Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-12 min-h-[600px]">
                  {currentGaps.length > 0 ? currentGaps.map((gap, idx) => (
                    <div key={idx} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all group">
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] font-bold text-gray-400 tracking-widest">{gap.id}</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 text-[9px] font-bold uppercase flex items-center gap-1">
                          <Check className="h-2 w-2" /> Verified Research
                        </span>
                      </div>
                      <h3 className="font-bold text-base text-black mb-3 leading-tight group-hover:text-[#F15B5B] transition-colors">
                        {gap.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-5">
                        <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                        <span className="text-xs font-bold text-gray-500">{gap.market}</span>
                      </div>
                      <button 
                        onClick={() => setSelectedGap(gap)}
                        className="w-full py-2.5 rounded-xl border-2 border-[#F15B5B] text-[#F15B5B] text-xs font-bold hover:bg-[#F15B5B] hover:text-white transition-all"
                      >
                        View Solution Strategy
                      </button>
                    </div>
                  )) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-20">
                      <Search className="h-12 w-12 text-gray-200 mb-4" />
                      <p className="text-gray-400 font-bold">No market gaps found matching your filters.</p>
                      <button 
                        onClick={() => {
                          setGapSearch('');
                          setGapIndustry('All Industries');
                          setGapPotential('Profit Potential');
                          setGapDifficulty('Difficulty');
                        }}
                        className="mt-4 text-[#F15B5B] text-sm font-bold hover:underline"
                      >
                        Clear all filters
                      </button>
                    </div>
                  )}
                </div>

                {/* Pagination Section */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 pb-20">
                    <button 
                      onClick={() => setGapPage(prev => Math.max(1, prev - 1))}
                      disabled={gapPage === 1}
                      className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:text-black disabled:opacity-50 transition-colors"
                    >
                      Prev
                    </button>
                    
                    {[...Array(totalPages)].map((_, i) => {
                      const pageNum = i + 1;
                      // Show first, last, and current page surroundings
                      if (
                        pageNum === 1 || 
                        pageNum === totalPages || 
                        (pageNum >= gapPage - 2 && pageNum <= gapPage + 2)
                      ) {
                        return (
                          <button 
                            key={pageNum}
                            onClick={() => setGapPage(pageNum)}
                            className={`w-10 h-10 rounded-lg text-sm font-bold transition-all ${gapPage === pageNum ? 'bg-black text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                          >
                            {pageNum}
                          </button>
                        );
                      }
                      // Show dots
                      if (pageNum === 2 || pageNum === totalPages - 1) {
                        return <span key={pageNum} className="text-gray-400 font-bold px-1">...</span>;
                      }
                      return null;
                    })}

                    <button 
                      onClick={() => setGapPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={gapPage === totalPages}
                      className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:text-black disabled:opacity-50 transition-colors"
                    >
                      Next
                    </button>
                  </div>
                )}

                {/* Strategy Modal */}
                <AnimatePresence>
                  {selectedGap && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
                    >
                      <motion.div 
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="bg-white rounded-[32px] p-8 max-w-3xl w-full relative shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
                      >
                        <button 
                          onClick={() => setSelectedGap(null)}
                          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-black bg-gray-50 rounded-full transition-colors z-20"
                        >
                          <X className="h-5 w-5" />
                        </button>

                        <div className="overflow-y-auto pr-2 custom-scrollbar">
                          <div className="flex items-center gap-3 mb-6">
                            <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                              <Check className="h-2.5 w-2.5" /> Verified Research
                            </div>
                            <span className="text-[10px] font-bold text-gray-400 tracking-widest">{selectedGap.id}</span>
                          </div>

                          <h2 className="text-3xl font-[900] text-black mb-4 leading-tight">
                            {selectedGap.title}
                          </h2>

                          <div className="grid grid-cols-3 gap-4 mb-8">
                            <div className="bg-gray-50 p-4 rounded-2xl">
                              <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Market Size</p>
                              <p className="text-sm font-bold text-black">{selectedGap.market}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-2xl">
                              <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Industry</p>
                              <p className="text-sm font-bold text-black">{selectedGap.industry}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-2xl">
                              <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Difficulty</p>
                              <p className="text-sm font-bold text-black">{selectedGap.difficulty}</p>
                            </div>
                          </div>

                          <div className="space-y-8 relative">
                            {/* Section 1 - Always Visible (Snippet for free) */}
                            <div>
                              <h3 className="text-lg font-bold text-black mb-3 flex items-center gap-2">
                                <Zap className="h-5 w-5 text-[#F15B5B]" />
                                {selectedGap.sections.section1.heading}
                              </h3>
                              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                <p className="text-slate-600 leading-relaxed font-medium">
                                  {isSubscribed ? selectedGap.sections.section1.content : `${selectedGap.sections.section1.content.substring(0, 150)}...`}
                                </p>
                              </div>
                            </div>

                            {/* Blurred Sections for Free Users */}
                            <div className={!isSubscribed ? 'blur-md select-none pointer-events-none' : ''}>
                              {[selectedGap.sections.section2, selectedGap.sections.section3, selectedGap.sections.section4, selectedGap.sections.section5, selectedGap.sections.section6].map((section, i) => (
                                <div key={i} className="mt-8">
                                  <h3 className="text-lg font-bold text-black mb-3">
                                    {section.heading}
                                  </h3>
                                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                    <p className="text-slate-600 leading-relaxed font-medium">
                                      {section.content}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Unlock Overlay for Free Users */}
                            {!isSubscribed && (
                              <div className="absolute inset-x-0 bottom-0 top-[150px] flex flex-col items-center justify-center bg-gradient-to-t from-white via-white/90 to-transparent pt-20 pb-10 z-10">
                                <div className="bg-white p-8 rounded-[32px] shadow-2xl border border-gray-100 text-center max-w-md mx-auto">
                                  <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Crown className="h-8 w-8 text-amber-500" />
                                  </div>
                                  <h4 className="text-2xl font-black text-black mb-3">Unlock 1000+ Words Research</h4>
                                  <p className="text-gray-500 text-sm mb-8">This is a premium deep-research report. Upgrade to Master Lifetime to access full execution roadmaps, tech stacks, and monetization strategies.</p>
                                  <button 
                                    onClick={() => setIsUpgradeModalOpen(true)}
                                    className="w-full py-4 bg-black text-white rounded-2xl font-bold hover:bg-slate-900 transition-all shadow-xl shadow-black/20 flex items-center justify-center gap-2"
                                  >
                                    <Crown className="h-5 w-5 text-amber-400" />
                                    Upgrade to Download Full Report
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-4 mt-8 pt-6 border-t border-gray-100 bg-white">
                          <button 
                            onClick={() => handleDownloadReport(selectedGap)}
                            className="flex-1 py-4 bg-black text-white rounded-2xl font-bold hover:bg-slate-900 transition-all shadow-lg shadow-black/10 flex items-center justify-center gap-2"
                          >
                            <ArrowDown className="h-5 w-5" />
                            Download Full 1000+ Words Report
                          </button>
                          <button 
                            onClick={() => handleSaveGap(selectedGap)}
                            className="flex-1 py-4 border-2 border-gray-100 text-black rounded-2xl font-bold hover:bg-gray-50 transition-all"
                          >
                            Save to Library
                          </button>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Product Ideas Page */}
        <div id="product-ideas-page" style={{ display: showProductIdeas ? 'block' : 'none', background: '#FFFFFF', minHeight: '100vh', paddingTop: '80px' }}>
          <div className="max-w-7xl mx-auto p-4 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px]">
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-6 flex items-center justify-center gap-3">
                <Lightbulb className="h-8 w-8 text-amber-500" />
                Product Ideas
              </h1>
              <hr className="border-gray-200 mb-6" />
              <p className="text-lg text-gray-700 leading-relaxed">
                Yahan aapko naye aur trending digital products ke ideas milenge jinhe aap asani se banakar bech sakte hain.
              </p>
            </div>
          </div>
        </div>

        {/* Book Title Generator Page */}
        <div id="book-title-generator-page" style={{ display: showBookTitleGenerator ? 'block' : 'none', background: '#FFFFFF', minHeight: '100vh', paddingTop: '80px' }}>
          <div className="max-w-7xl mx-auto p-4 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px]">
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-6 flex items-center justify-center gap-3">
                <FileEdit className="h-8 w-8 text-blue-500" />
                Book Title Generator
              </h1>
              <hr className="border-gray-200 mb-6" />
              <p className="text-lg text-gray-700 leading-relaxed">
                Yahan aap apni nayi book ke liye aakarshak aur trending titles generate kar sakte hain.
              </p>
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
              className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-[32px] p-8 max-w-sm w-full relative shadow-2xl"
              >
                <button 
                  onClick={() => {
                    setIsUpgradeModalOpen(false);
                    setShowProducts(true);
                    setShowSamplesPage(false);
                    setShowSaved(false);
                    setShowRequestPage(false);
                    setShowMemberHub(false);
                    setShowMarketGaps(false);
                    setSelectedProduct(null);
                    setActiveItem('products');
                  }} 
                  className="absolute top-6 right-6 text-gray-400 hover:text-black"
                >
                  <X className="h-5 w-5" />
                </button>
                
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 rounded-full text-[10px] font-bold text-amber-600 tracking-wider mb-4 border border-amber-100">
                    <Crown className="h-3 w-3" /> MASTER LIFETIME ONLY
                  </div>
                  <h2 className="text-2xl font-extrabold text-black mb-3">Unlock Market Gaps</h2>
                  <p className="text-gray-500 text-sm mx-auto max-w-[280px]">Get access to 200+ curated business opportunities. Upgrade your plan to unlock the full vault and start building your business.</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-sm text-gray-900 font-medium">
                    <Check className="h-5 w-5 text-black" /> Access 200+ Market Gaps
                  </div>
                  
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-[10px] uppercase tracking-widest text-gray-400">
                      <span className="bg-white px-3">PLUS GET EVERYTHING ELSE</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-gray-600">
                    <div className="flex flex-col items-center gap-2">
                      <div className="p-3 bg-gray-50 rounded-xl"><ArrowDown className="h-5 w-5 text-gray-600" /></div>
                      Unlimited Downloads
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="p-3 bg-gray-50 rounded-xl"><Library className="h-5 w-5 text-gray-600" /></div>
                      Full Library Access
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="p-3 bg-gray-50 rounded-xl"><Lock className="h-5 w-5 text-gray-600" /></div>
                      PLR License
                    </div>
                  </div>
                </div>

                <a
                  href="/pricing"
                  className="block w-full text-center px-6 py-4 bg-[#E11D48] text-white rounded-xl font-bold hover:bg-[#BE123C] transition-colors mb-6 text-sm"
                >
                  See pricing plans →
                </a>
                
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 mb-6">
                  <Shield className="h-3.5 w-3.5" /> Secure checkout • Lifetime access
                </div>
                
                <button
                  onClick={() => {
                    setIsUpgradeModalOpen(false);
                    setShowProducts(true);
                    setShowSamplesPage(false);
                    setShowSaved(false);
                    setShowRequestPage(false);
                    setShowMemberHub(false);
                    setShowMarketGaps(false);
                    setSelectedProduct(null);
                    setActiveItem('products');
                  }}
                  className="block w-full text-center text-xs text-gray-400 underline hover:text-gray-600"
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
