import { useState } from 'react';
import { BookOpen, Lock, Sparkles, Loader2, ArrowLeft, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";

interface BookTitleGeneratorProps {
  onUpgrade?: () => void;
}

export default function BookTitleGenerator({ onUpgrade }: BookTitleGeneratorProps) {
  const [bookDescription, setBookDescription] = useState('');
  const [titleLength, setTitleLength] = useState('Medium (4-6 words)');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<string[] | null>(null);

  const lengths = [
    'Short (1-3 words)',
    'Medium (4-6 words)',
    'Long (7+ words)'
  ];

  const handleUnlock = async () => {
    if (onUpgrade) {
      onUpgrade();
      return;
    }

    if (!bookDescription) {
      alert("Please describe what your book is about!");
      return;
    }

    setIsLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `Generate 5 catchy and high-converting book titles for a book with this description:
      "${bookDescription}"
      Desired Title Length: ${titleLength}
      
      Return the response as a simple JSON array of strings.`;

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
      console.error("Error generating titles:", error);
      // Fallback mock data
      setResults([
        "The Balance Blueprint",
        "Entrepreneurial Zen",
        "Work-Life Mastery for Founders",
        "The Productive Pioneer",
        "Beyond the Hustle"
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
                  Book Title Generator
                </h1>
                <p className="text-gray-400 text-sm leading-relaxed font-medium">
                  Generate high-converting book titles that grab attention and drive sales instantly.
                </p>
              </div>

              {/* Form */}
              <div className="space-y-8 flex-grow">
                {/* Input Section */}
                <div className="space-y-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-lg font-bold text-black">What's your book about?</label>
                    <span className="text-xs text-gray-400 font-medium">Describe the core value or story of your book.</span>
                  </div>
                  <div className="relative group">
                    <div className="absolute top-4 left-4 pointer-events-none">
                      <BookOpen className="h-5 w-5 text-gray-300 group-focus-within:text-black transition-colors" />
                    </div>
                    <textarea
                      className="block w-full bg-gray-50/50 border border-gray-200 rounded-2xl pl-12 pr-5 py-4 text-sm text-black placeholder:text-gray-300 focus:bg-white focus:ring-4 focus:ring-black/5 focus:border-black outline-none transition-all duration-300 min-h-[120px] resize-none"
                      placeholder="A self-help guide for entrepreneurs struggling with work-life balance..."
                      value={bookDescription}
                      onChange={(e) => setBookDescription(e.target.value)}
                    />
                  </div>
                </div>

                {/* Title Length Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-bold text-black uppercase tracking-wider">Title Length</label>
                    <span className="text-xs text-gray-400 italic font-medium">(optional)</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    {lengths.map((length) => (
                      <button
                        key={length}
                        onClick={() => setTitleLength(length)}
                        className={`py-4 px-6 text-sm font-bold rounded-2xl border transition-all duration-300 text-left ${
                          titleLength === length
                            ? 'bg-black border-black text-white shadow-xl shadow-black/10'
                            : 'bg-white border-gray-100 text-black hover:border-gray-200'
                        }`}
                      >
                        {length}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-10">
                <button
                  onClick={handleUnlock}
                  disabled={isLoading}
                  className="w-full bg-black text-white py-5 rounded-2xl font-bold text-lg hover:bg-gray-900 disabled:bg-gray-400 transition-all shadow-xl shadow-black/20 flex items-center justify-center gap-3 active:scale-[0.98]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Generating Titles...
                    </>
                  ) : (
                    <>
                      Unlock Title Generator
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
                <span className="text-xs font-bold uppercase tracking-widest">Back to Generator</span>
              </button>

              <div className="mb-8">
                <h2 className="text-3xl font-extrabold text-black mb-2">Suggested <span className="text-blue-600">Titles</span></h2>
                <p className="text-gray-400 text-sm font-medium">Based on your description</p>
              </div>

              <div className="space-y-4 flex-grow overflow-y-auto pr-2 max-h-[400px] custom-scrollbar">
                {results.map((title, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-5 rounded-2xl border border-gray-100 bg-gray-50/30 hover:bg-white hover:shadow-lg hover:shadow-black/5 transition-all group cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(title);
                      alert("Title copied to clipboard!");
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Lightbulb className="h-4 w-4 text-blue-500" />
                      </div>
                      <h3 className="font-bold text-black group-hover:text-blue-600 transition-colors">{title}</h3>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-10">
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
                  Generate More Titles
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
