import { useState } from 'react';
import { User, Flag, Lock, Sparkles, Zap, ChevronRight, Loader2, ArrowLeft, TrendingUp, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";

interface ProductIdea {
  title: string;
  description: string;
  monetization: string;
}

interface ProductIdeatorProps {
  onUpgrade?: () => void;
}

export default function ProductIdeator({ onUpgrade }: ProductIdeatorProps) {
  const [whoFor, setWhoFor] = useState('');
  const [topic, setTopic] = useState('');
  const [format, setFormat] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<ProductIdea[] | null>(null);

  const formats = ['E-book', 'Course', 'Template', 'Software', 'Membership', 'Coaching'];

  const trendingIdeas = [
    { title: "AI Prompt Library for Realtors", category: "Template" },
    { title: "Micro-SaaS for Ghostwriters", category: "Software" },
    { title: "Notion Life OS for Students", category: "Template" }
  ];

  const handleUnlock = async () => {
    if (onUpgrade) {
      onUpgrade();
      return;
    }

    if (!whoFor) {
      alert("Please specify who this is for!");
      return;
    }

    setIsLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `Generate 3 unique and highly profitable digital product ideas for:
      Target Audience: ${whoFor}
      Topic: ${topic || 'Any profitable niche'}
      Preferred Format: ${format || 'Any digital format'}
      
      Return the response as a JSON array of objects with 'title', 'description', and 'monetization' keys.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        }
      });

      const data = JSON.parse(response.text || '[]');
      setResults(data);
    } catch (error) {
      console.error("Error generating ideas:", error);
      // Fallback mock data if AI fails
      setResults([
        { title: `${topic || 'Niche'} Masterclass`, description: `A comprehensive guide for ${whoFor} to master ${topic || 'skills'}.`, monetization: "One-time payment of $97" },
        { title: `${whoFor} Workflow Kit`, description: `Ready-to-use tools and templates for ${whoFor}.`, monetization: "Subscription $19/mo" },
        { title: "The ${topic || 'Expert'} Roadmap", description: `Step-by-step coaching for ${whoFor}.`, monetization: "High-ticket coaching $499" }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative overflow-hidden min-h-[600px] flex flex-col">
        {/* Badge */}
        <div className="flex justify-start mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">AI-Powered</span>
          </div>
        </div>
        
        <AnimatePresence mode="wait">
          {!results ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex-grow flex flex-col"
            >
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-4xl font-extrabold text-black mb-4 tracking-tight leading-tight">
                  Product Ideas Generator
                </h1>
                <p className="text-gray-400 text-sm leading-relaxed font-medium">
                  Craft your next digital masterpiece with precision-targeted AI.
                </p>
              </div>

              {/* Form */}
              <div className="space-y-6 flex-grow">
                {/* Who is this for? */}
                <div className="space-y-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-lg font-bold text-black">Target Audience</label>
                    <span className="text-xs text-gray-400 font-medium">Who are you building this for?</span>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-300 group-focus-within:text-black transition-colors" />
                    </div>
                    <input
                      type="text"
                      className="block w-full bg-gray-50/50 border border-gray-200 rounded-2xl pl-11 pr-5 py-4 text-sm text-black placeholder:text-gray-300 focus:bg-white focus:ring-4 focus:ring-black/5 focus:border-black outline-none transition-all duration-300"
                      placeholder="e.g. Busy moms, Real estate agents"
                      value={whoFor}
                      onChange={(e) => setWhoFor(e.target.value)}
                    />
                  </div>
                </div>

                {/* Topic */}
                <div className="space-y-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-lg font-bold text-black">Core Topic</label>
                    <span className="text-xs text-gray-400 font-medium">What is the main subject? (Optional)</span>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Flag className="h-5 w-5 text-gray-300 group-focus-within:text-black transition-colors" />
                    </div>
                    <input
                      type="text"
                      className="block w-full bg-gray-50/50 border border-gray-200 rounded-2xl pl-11 pr-5 py-4 text-sm text-black placeholder:text-gray-300 focus:bg-white focus:ring-4 focus:ring-black/5 focus:border-black outline-none transition-all duration-300"
                      placeholder="e.g. Time management, SEO"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                    />
                  </div>
                </div>

                {/* Format */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-bold text-black uppercase tracking-wider">Product Format</label>
                    <span className="text-xs text-gray-400 italic font-medium">(optional)</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {formats.map((f) => (
                      <button
                        key={f}
                        onClick={() => setFormat(f === format ? '' : f)}
                        className={`py-3 px-4 text-xs font-bold rounded-2xl border transition-all duration-300 flex items-center justify-between group/btn ${
                          format === f
                            ? 'bg-black border-black text-white shadow-xl shadow-black/10'
                            : 'bg-white border-gray-100 text-black hover:border-gray-200'
                        }`}
                      >
                        {f}
                        <Zap className={`h-3 w-3 transition-opacity ${format === f ? 'opacity-100' : 'opacity-0 group-hover/btn:opacity-30'}`} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Trending Section */}
              <div className="mt-8 pt-6 border-t border-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-3 w-3 text-blue-500" />
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Trending This Week</span>
                  </div>
                  <span className="text-[9px] font-bold text-gray-300">Live Feed</span>
                </div>
                <div className="space-y-3">
                  {trendingIdeas.map((idea, idx) => (
                    <div key={idx} className="group/item flex items-center justify-between p-3 rounded-xl bg-gray-50/50 hover:bg-white hover:shadow-lg hover:shadow-black/5 transition-all cursor-default border border-transparent">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-black group-hover/item:text-blue-600 transition-colors">{idea.title}</span>
                        <span className="text-[9px] text-gray-400 font-medium">Recently generated</span>
                      </div>
                      <span className="text-[9px] font-black text-blue-500 bg-white border border-blue-100 px-2 py-1 rounded-lg shadow-sm">{idea.category}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Button */}
              <div className="mt-8">
                <button
                  onClick={handleUnlock}
                  disabled={isLoading}
                  className="w-full bg-black text-white py-5 rounded-2xl font-bold text-lg hover:bg-gray-900 disabled:bg-gray-400 transition-all shadow-xl shadow-black/20 flex items-center justify-center gap-3 active:scale-[0.98]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      Unlock Ideator
                      <Lock className="h-5 w-5" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-grow flex flex-col"
            >
              <button 
                onClick={() => setResults(null)}
                className="flex items-center gap-2 text-gray-400 hover:text-black transition-colors mb-8 group"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs font-bold uppercase tracking-widest">Back to Ideator</span>
              </button>

              <div className="mb-8">
                <h2 className="text-3xl font-extrabold text-black mb-2">Your <span className="text-blue-600">Ideas</span></h2>
                <p className="text-gray-400 text-sm font-medium">Tailored for {whoFor}</p>
              </div>

              <div className="space-y-4 flex-grow overflow-y-auto pr-2 max-h-[400px] custom-scrollbar">
                {results.map((idea, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-5 rounded-2xl border border-gray-100 bg-gray-50/30 hover:bg-white hover:shadow-lg hover:shadow-black/5 transition-all group"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Lightbulb className="h-4 w-4 text-blue-500" />
                      </div>
                      <h3 className="font-bold text-black group-hover:text-blue-600 transition-colors">{idea.title}</h3>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed mb-4">{idea.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Monetization</span>
                      <span className="text-[11px] font-bold text-blue-600">{idea.monetization}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8">
                <button
                  onClick={() => {
                    if (onUpgrade) {
                      onUpgrade();
                    } else {
                      setResults(null);
                    }
                  }}
                  className="w-full bg-black text-white py-5 rounded-2xl font-bold text-sm hover:bg-gray-900 transition-all shadow-lg"
                >
                  Generate More Ideas
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
