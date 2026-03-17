import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, X } from 'lucide-react';

const INDIAN_NAMES = [
  "Amit", "Priya", "Rahul", "Anjali", "Vikram", "Sneha", "Arjun", "Kavita",
  "Suresh", "Meera", "Rohan", "Pooja", "Aditya", "Neha", "Karan", "Ishani",
  "Deepak", "Ritu", "Manish", "Shweta", "Abhishek", "Tanvi", "Vivek", "Divya"
];

const INDIAN_CITIES = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata",
  "Surat", "Pune", "Jaipur", "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane",
  "Bhopal", "Visakhapatnam", "Pimpri-Chinchwad", "Patna", "Vadodara"
];

const PRODUCTS = [
  { name: "Digital Marketing Kit", image: "https://picsum.photos/seed/marketing/100/100" },
  { name: "E-commerce Blueprint", image: "https://picsum.photos/seed/ecommerce/100/100" },
  { name: "SEO Masterclass", image: "https://picsum.photos/seed/seo/100/100" },
  { name: "Social Media Growth", image: "https://picsum.photos/seed/social/100/100" }
];

export default function SalesNotification() {
  const [notification, setNotification] = useState<{ name: string, city: string, product: string, image: string } | null>(null);

  useEffect(() => {
    const showNotification = () => {
      const randomName = INDIAN_NAMES[Math.floor(Math.random() * INDIAN_NAMES.length)];
      const randomCity = INDIAN_CITIES[Math.floor(Math.random() * INDIAN_CITIES.length)];
      const randomProduct = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];

      setNotification({
        name: randomName,
        city: randomCity,
        product: randomProduct.name,
        image: randomProduct.image
      });

      // Hide after 3 seconds
      setTimeout(() => {
        setNotification(null);
      }, 3000);

      // Schedule next notification (5-10 seconds)
      const nextDelay = Math.floor(Math.random() * 5000) + 5000;
      setTimeout(showNotification, nextDelay + 3000);
    };

    // Initial delay
    const initialDelay = Math.floor(Math.random() * 5000) + 2000;
    const timer = setTimeout(showNotification, initialDelay);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
          className="fixed bottom-8 left-0 right-0 z-[100] flex justify-center px-4 pointer-events-none"
        >
          <div className="bg-white/95 backdrop-blur-sm border border-slate-200 shadow-2xl rounded-full flex items-center w-full max-w-[400px] overflow-hidden py-1.5 px-2">
            {/* Left Icon Block - Rounded Circle */}
            <div className="bg-indigo-600 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ml-1">
              <ShoppingBag className="w-4 h-4 text-white" />
            </div>
            
            {/* Content Area */}
            <div className="flex-1 px-3 flex items-center justify-between min-w-0">
              <div className="flex flex-col min-w-0">
                <span className="text-slate-900 font-bold text-[13px] tracking-tight truncate">
                  {notification.name} from {notification.city}
                </span>
                <p className="text-slate-500 text-[11px] font-medium truncate">
                  just purchased {notification.product}!
                </p>
              </div>
              <X className="w-3.5 h-3.5 text-slate-400 ml-2 flex-shrink-0" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
