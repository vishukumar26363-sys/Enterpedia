import { useState } from "react";
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
import PaymentSimulationModal from "./components/PaymentSimulationModal";
import { WelcomeGiftProvider } from "./context/WelcomeGiftContext";
import { products } from "./data";
import { Product, CartItem } from "./types";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { useEffect } from "react";

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
  const [showProducts, setShowProducts] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
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
    setShowProducts(true);
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
        <Navbar
          cartCount={cartCount}
          onOpenCart={() => setIsCartOpen(true)}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isLoggedIn={isLoggedIn}
          onOpenAuth={() => setIsAuthModalOpen(true)}
          onLogout={handleLogout}
          onGoHome={() => setShowProducts(false)}
          onShowProducts={() => setShowProducts(true)}
          onOpenContact={() => setIsContactModalOpen(true)}
        />

        <main className="flex-grow">
          {selectedProduct ? (
            <ProductDetails
              product={selectedProduct}
              onBack={() => setSelectedProduct(null)}
              onAddToCart={handleAddToCart}
              onDownload={handleDownloadRequest}
            />
          ) : !showProducts ? (
            <>
              <Hero
                isLoggedIn={isLoggedIn}
                onOpenAuth={() => setIsAuthModalOpen(true)}
                onShowProducts={() => setShowProducts(true)}
                onOpenLicense={() => setIsLicenseModalOpen(true)}
              />
            </>
          ) : (
            <ProductGrid
              products={products}
              onAddToCart={handleAddToCart}
              onOpenProduct={(product) => setSelectedProduct(product)}
              onDownload={handleDownloadRequest}
              searchTerm={searchTerm}
            />
          )}
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
      </div>
    </WelcomeGiftProvider>
  );
}
