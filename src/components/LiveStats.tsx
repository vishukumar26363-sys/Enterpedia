import { useEffect, useState } from "react";
import { Star, Award } from "lucide-react";

// Custom hook for localStorage persistence
function usePersistentState<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  const [state, setState] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

// Animated Number Component for smooth count-up on load and live updates
function AnimatedNumber({ value, decimals = 0 }: { value: number, decimals?: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const startValue = displayValue;
    const endValue = value;
    // Ultra fast counting: 0.3 seconds for initial load, 0.2 seconds for live updates
    const duration = startValue === 0 ? 300 : 200;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      // easeOutQuart for smooth deceleration
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      
      setDisplayValue(startValue + (endValue - startValue) * easeProgress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(endValue);
      }
    };
    
    const rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return <>{decimals > 0 ? displayValue.toFixed(decimals) : Math.floor(displayValue).toLocaleString()}</>;
}

export default function LiveStats() {
  const [visitors, setVisitors] = usePersistentState("live_visitors_v2", 1372);
  const [sales, setSales] = usePersistentState("live_sales_v2", 2239);
  const [customers, setCustomers] = usePersistentState("live_customers_v2", 4278);
  const [rating, setRating] = usePersistentState("live_rating_v2", 4.8);

  // Live Visitors: 1372 to 1500
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const updateVisitors = () => {
      const delay = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000;
      timeoutId = setTimeout(() => {
        setVisitors((prev: number) => {
          const next = prev + Math.floor(Math.random() * 5) + 1;
          return next >= 1500 ? 1372 : next;
        });
        updateVisitors();
      }, delay);
    };
    updateVisitors();
    return () => clearTimeout(timeoutId);
  }, [setVisitors]);

  // Live Sales: 2239 to 2400
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const updateSales = () => {
      const delay = Math.floor(Math.random() * (120000 - 60000 + 1)) + 60000;
      timeoutId = setTimeout(() => {
        setSales((prev: number) => {
          const next = prev + 1;
          return next >= 2400 ? 2239 : next;
        });
        updateSales();
      }, delay);
    };
    updateSales();
    return () => clearTimeout(timeoutId);
  }, [setSales]);

  // Happy Customers: 4278 to 4500
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCustomers((prev: number) => {
        const next = prev + Math.floor(Math.random() * 2) + 1;
        return next >= 4500 ? 4278 : next;
      });
    }, 30000);
    return () => clearInterval(intervalId);
  }, [setCustomers]);

  const cardStyle = {
    background: 'radial-gradient(at top left, #FFF5F8 0%, #F4F7FF 100%)',
    border: '1px solid rgba(255, 255, 255, 0.5)'
  };

  const cardClass = "backdrop-blur-md aspect-square sm:aspect-auto lg:aspect-square rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-8 flex flex-col items-center justify-center text-center hover:-translate-y-2 transition-transform duration-500 relative overflow-hidden";

  const numberClass = "text-4xl md:text-5xl font-display font-bold text-slate-900 mb-3 tracking-tight";

  return (
    <div className="relative pt-12 pb-12 w-full bg-pink-50 overflow-hidden">
      {/* Light Pink Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[80%] rounded-full bg-pink-100/50 blur-[100px] pointer-events-none"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Box 1: Live Visitors */}
          <div className={cardClass} style={cardStyle}>
            <div className={numberClass}>
              <AnimatedNumber value={visitors} />
            </div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Live Visitors
            </div>
          </div>

          {/* Box 2: Live Sales */}
          <div className={cardClass} style={cardStyle}>
            <div className={numberClass}>
              <AnimatedNumber value={sales} />+
            </div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Live Sales
            </div>
          </div>

          {/* Box 3: Happy Customers */}
          <div className={cardClass} style={cardStyle}>
            <div className="flex space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <div className={numberClass}>
              <AnimatedNumber value={customers} />+
            </div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Happy Customers
            </div>
          </div>

          {/* Box 4: Average Rating */}
          <div className={cardClass} style={cardStyle}>
            <div className="absolute top-8 right-8">
              <Award className="w-7 h-7 text-slate-900" />
            </div>
            <div className={numberClass}>
              <AnimatedNumber value={rating} decimals={1} />/5
            </div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Average Rating
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
