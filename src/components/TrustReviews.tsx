import { Star, Quote, Facebook } from "lucide-react";

interface TrustReviewsProps {
  onShowProducts?: () => void;
}

const testimonials = [
  {
    headline: "Increases conversions by 40% with these resellable kits",
    text: "The premium feel of these digital products is unmatched. My customers love them, and I've seen a massive increase in sales since I started offering them. It's truly a game-changer for my business.",
    name: "Sarah Jenkins",
    country: "United States",
    image: "https://picsum.photos/seed/sarah/100/100"
  },
  {
    headline: "The best PLR content I've ever purchased",
    text: "I was skeptical at first, but the quality of the content is incredible. It saved me hundreds of hours of work, and the return on investment was immediate. Highly recommended for any digital entrepreneur.",
    name: "David Chen",
    country: "Canada",
    image: "https://picsum.photos/seed/david/100/100"
  },
  {
    headline: "Completely transformed my online business",
    text: "These kits are a game changer. The ability to rebrand and sell them as my own has allowed me to scale my business faster than I ever thought possible. The value provided here is just insane.",
    name: "Emma Thompson",
    country: "United Kingdom",
    image: "https://picsum.photos/seed/emma/100/100"
  }
];

export default function TrustReviews({ onShowProducts }: TrustReviewsProps) {
  return (
    <>
      <div className="bg-slate-50 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Quote Box */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100 relative mb-16 max-w-2xl mx-auto">
            <p className="text-2xl md:text-3xl font-bold text-black leading-tight">
              "Everything here sells way better than I expected"
            </p>
          </div>

          {/* Horizontal Review Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Trustpilot */}
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#00B67A] flex items-center justify-center rounded-sm">
                  <Star className="w-5 h-5 text-white fill-white" />
                </div>
                <span className="text-xl font-bold text-black tracking-tight">Trustpilot</span>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-6 h-6 bg-[#00B67A] flex items-center justify-center rounded-sm">
                    <Star className="w-4 h-4 text-white fill-white" />
                  </div>
                ))}
              </div>
              <span className="text-sm font-medium text-slate-600">Trustpilot 4.8/5</span>
            </div>

            {/* Facebook */}
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="flex items-center gap-2">
                <Facebook className="w-8 h-8 text-[#1877F2] fill-[#1877F2]" />
                <span className="text-xl font-bold text-black tracking-tight">Facebook</span>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-6 h-6 text-[#1877F2] fill-[#1877F2]" />
                ))}
              </div>
              <span className="text-sm font-medium text-slate-600">Facebook 4.9/5</span>
            </div>

            {/* Google */}
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="flex items-center gap-2">
                <svg className="w-8 h-8" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span className="text-xl font-bold text-black tracking-tight">Google</span>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-6 h-6 text-[#FBBC05] fill-[#FBBC05]" />
                ))}
              </div>
              <span className="text-sm font-medium text-slate-600">Google 4.8/5</span>
            </div>
          </div>
        </div>
      </div>

      {/* Vertical Testimonials Section */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-2xl mx-auto space-y-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)] border border-slate-200 flex flex-col hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.1)] transition-all duration-300">
              <div className="bg-red-50 w-12 h-12 rounded-full flex items-center justify-center mb-5">
                <Quote className="w-5 h-5 text-red-500 fill-red-500" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3 leading-snug tracking-tight">
                "{testimonial.headline}"
              </h3>
              <p className="text-slate-600 text-base mb-6 leading-relaxed">
                {testimonial.text}
              </p>
              <div className="mt-auto flex items-center gap-3 pt-5 border-t border-slate-100">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover shadow-sm border border-slate-100"
                  referrerPolicy="no-referrer"
                />
                <div className="flex flex-col">
                  <span className="font-bold text-black text-base">{testimonial.name}</span>
                  <span className="text-sm font-medium text-slate-500">{testimonial.country}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
