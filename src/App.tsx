import { useState, useEffect } from "react";
import { ArrowLeft, Bookmark } from "lucide-react";
import { Analytics } from "@vercel/analytics/react";
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
import { Product, CartItem } from "./types";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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
            setSelectedProduct(null);
          }}
          onShowProducts={() => {
            setShowSamplesPage(true);
            setShowProducts(false);
            setShowSaved(false);
            setSelectedProduct(null);
          }}
          onShowSaved={() => {
            setShowSaved(true);
            setShowSamplesPage(false);
            setShowProducts(false);
            setSelectedProduct(null);
          }}
          onOpenContact={() => setIsContactModalOpen(true)}
          isProductPage={showProducts || !!selectedProduct || showSamplesPage || showSaved}
        />

        <main className="flex-grow">
          <div id="home-page" style={{ display: !showSamplesPage && !showSaved ? 'block' : 'none' }}>
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
        <Analytics />
      </div>
    </WelcomeGiftProvider>
  );
}
