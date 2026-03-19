import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Menu, ShoppingCart, ArrowRight } from "lucide-react";
import { Product } from "../types";
import { categories } from "../data";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  onOpenProduct: (product: Product) => void;
  onDownload: (product: Product) => void;
  searchTerm: string;
}

export default function ProductGrid({
  products,
  onOpenProduct,
  onDownload,
  searchTerm,
}: ProductGridProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeCategory, setActiveCategory] = useState("All");
  const [localSearchTerm, setLocalSearchTerm] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "All" || product.category === activeCategory;
    
    // Check both global search term (from Navbar) and local search term
    const combinedSearchTerm = localSearchTerm || searchTerm;
    const matchesSearch =
      product.title.toLowerCase().includes(combinedSearchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(combinedSearchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const openBlankPage = () => {
    document.body.innerHTML = '';
    document.body.style.backgroundColor = 'white';
  };

  return (
    <section
      id="products"
      className="py-24 bg-white relative overflow-hidden font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* New Black Box Header */}
        <div className="w-full bg-black rounded-2xl flex items-center justify-between py-5 px-6 sm:px-8 mb-12 shadow-xl min-h-[80px]">
          <div className="flex items-center max-w-[75%]">
            <span className="text-white font-bold text-base sm:text-xl leading-tight">
              Kickstart 2026 with special library offer
            </span>
          </div>
          <button 
            onClick={openBlankPage}
            className="bg-[#E50914] text-white px-3 py-1 rounded-full font-bold text-[11px] sm:text-xs flex items-center gap-1 hover:bg-red-700 transition-colors shadow-sm whitespace-nowrap"
          >
            Claim Deal <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="flex flex-col items-center justify-center mb-12 gap-8 text-center">
          <div className="max-w-3xl mx-auto w-full">
            <h2 className="text-[28px] md:text-[42px] font-bold text-[#000000] mb-5 leading-tight">
              Explore Our Premium Digital Assets Library
            </h2>
            <p className="text-[16px] md:text-[18px] text-[#555555] mb-8">
              Join 5,000+ Indian Creators Using Our Premium Digital Assets
            </p>

            {/* Instant Live Search Bar */}
            <div className="relative max-w-xl mx-auto mb-8">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for Reels, Ebooks, Templates..."
                value={localSearchTerm}
                onChange={(e) => setLocalSearchTerm(e.target.value)}
                className="block w-full pl-11 pr-4 py-3.5 border border-[#eaeaea] rounded-full text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all shadow-sm text-base"
              />
            </div>
          </div>

          {/* Sleek Category Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 border ${
                  activeCategory === category
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:text-black"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <ProductCard
                    product={product}
                    onOpenProduct={onOpenProduct}
                    onDownload={onDownload}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 bg-white rounded-lg border border-[#eaeaea] shadow-sm"
          >
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="text-xl font-bold text-black mb-2">
              No products found
            </h3>
            <p className="text-gray-500 mb-8">
              No products found. Try searching for Reels or Ebooks.
            </p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setLocalSearchTerm("");
              }}
              className="inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-semibold rounded-md text-white bg-black hover:bg-gray-800 transition-colors"
            >
              Clear All Filters
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
