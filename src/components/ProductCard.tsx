import React, { useState, useEffect } from "react";
import { ShoppingCart, Star, ExternalLink, Download, CreditCard, Bookmark } from "lucide-react";
import { Product } from "../types";
import { useWelcomeGift } from "../context/WelcomeGiftContext";

interface ProductCardProps {
  product: Product;
  onOpenProduct: (product: Product) => void;
  onDownload: (product: Product) => void;
  key?: string | number;
}

export default function ProductCard({
  product,
  onOpenProduct,
  onDownload,
}: ProductCardProps) {
  const { isDiscountActive, discountPercentage } = useWelcomeGift();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const checkSaved = () => {
      const saved = localStorage.getItem('savedProducts');
      if (saved) {
        const savedArray = JSON.parse(saved);
        setIsSaved(savedArray.includes(product.id));
      }
    };

    checkSaved();
    window.addEventListener('savedProductsChanged', checkSaved);
    return () => window.removeEventListener('savedProductsChanged', checkSaved);
  }, [product.id]);

  const toggleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    const saved = localStorage.getItem('savedProducts');
    let savedArray = saved ? JSON.parse(saved) : [];
    
    if (isSaved) {
      savedArray = savedArray.filter((id: string) => id !== product.id);
    } else {
      savedArray.push(product.id);
    }
    
    localStorage.setItem('savedProducts', JSON.stringify(savedArray));
    setIsSaved(!isSaved);
    window.dispatchEvent(new CustomEvent('savedProductsChanged'));
  };

  const currentPrice = isDiscountActive
    ? product.price * (1 - discountPercentage / 100)
    : product.price;

  return (
    <div className="group flex flex-col bg-white rounded-lg border border-[#eaeaea] shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden font-sans">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-50 p-2">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="object-cover w-full h-full rounded-lg group-hover:scale-105 transition-transform duration-500 ease-out"
          referrerPolicy="no-referrer"
        />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm border border-gray-200 rounded text-[10px] font-bold text-black uppercase tracking-wider shadow-sm">
            {product.category}
          </span>
        </div>

        {/* Save Icon */}
        <button
          onClick={toggleSave}
          className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full text-black hover:bg-white transition-colors shadow-sm z-10"
          aria-label={isSaved ? "Remove from saved" : "Save product"}
        >
          <Bookmark 
            className={`h-4 w-4 transition-colors ${isSaved ? "fill-black text-black" : "text-black"}`} 
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow bg-white items-center text-center">
        <div className="flex items-center justify-center space-x-1 mb-2">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs font-bold text-black">
            {product.rating}
          </span>
          <span className="text-xs text-gray-500 font-medium">
            ({product.reviews})
          </span>
        </div>

        <h3 className="text-lg font-bold text-black mb-2 line-clamp-2 leading-tight">
          {product.title}
        </h3>

        <p className="text-sm text-gray-600 mb-5 line-clamp-2 flex-grow leading-relaxed">
          {product.description}
        </p>

        {/* Features */}
        <div className="space-y-2 mb-6 w-full">
          {product.features.slice(0, 3).map((feature, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center text-xs text-gray-700 font-medium"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-black mr-2 flex-shrink-0" />
              <span className="truncate">{feature}</span>
            </div>
          ))}
        </div>

        {/* Pricing & Action */}
        <div className="mt-auto pt-4 border-t border-[#eaeaea] flex flex-col items-center gap-3 w-full">
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-xl font-bold text-black">
              ₹{currentPrice.toFixed(0)}
            </span>
            {isDiscountActive && (
              <span className="text-sm text-gray-400 line-through font-medium">
                ₹{product.price.toFixed(0)}
              </span>
            )}
          </div>
          
          <div className="w-full max-w-[200px] flex flex-col gap-2 mx-auto">
            <button
              onClick={() => onOpenProduct(product)}
              className="w-full flex items-center justify-center space-x-2 bg-black hover:bg-gray-800 text-white py-2.5 rounded-md transition-colors duration-200 font-semibold text-sm"
            >
              <CreditCard className="h-4 w-4" />
              <span>Pay Now</span>
            </button>
            <div className="flex gap-2 w-full">
              <button
                onClick={() => onOpenProduct(product)}
                className="flex-1 flex items-center justify-center space-x-1.5 bg-white hover:bg-gray-50 text-black border border-gray-200 py-2.5 rounded-md transition-colors duration-200 font-semibold text-xs"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span>Open</span>
              </button>
              <button
                onClick={() => onDownload(product)}
                className="flex-1 flex items-center justify-center space-x-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 py-2.5 rounded-md transition-colors duration-200 font-semibold text-xs"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
