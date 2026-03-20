import { useState } from 'react';
import { User, Flag, Lock } from 'lucide-react';

export default function ProductIdeator() {
  const [whoFor, setWhoFor] = useState('');
  const [topic, setTopic] = useState('');
  const [format, setFormat] = useState('');

  const formats = ['E-book', 'Course', 'Template', 'Software', 'Membership', 'Coaching'];

  const handleUnlock = () => {
    console.log({ whoFor, topic, format });
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 sm:p-8 rounded-[2rem] shadow-sm border border-gray-100 font-sans">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full mb-6">
        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
        <span className="text-xs font-semibold text-gray-900 tracking-wide">AI-Powered</span>
      </div>

      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">Digital Product Ideator</h1>
      <p className="text-gray-500 text-sm mb-8 leading-relaxed">
        Generate tailored digital product ideas based on your target audience, topic, and preferred format.
      </p>

      {/* Form */}
      <div className="space-y-6">
        {/* Who is this for? */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-900">Who is this for?</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-black focus:border-black outline-none transition-all"
              placeholder="Busy moms, Real estate agents, Fre..."
              value={whoFor}
              onChange={(e) => setWhoFor(e.target.value)}
            />
          </div>
        </div>

        {/* Topic */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-900">
            Topic <span className="italic text-gray-400 font-normal ml-1">optional</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Flag className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-black focus:border-black outline-none transition-all"
              placeholder="Time management, SEO, Personal finan..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
        </div>

        {/* Format */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-900">
            Format <span className="italic text-gray-400 font-normal ml-1">optional</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {formats.map((f) => (
              <button
                key={f}
                onClick={() => setFormat(f === format ? '' : f)}
                className={`py-3 px-4 text-sm font-medium rounded-xl border transition-all ${
                  format === f
                    ? 'border-black bg-gray-50 text-black shadow-sm'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="mt-10">
        <button
          onClick={handleUnlock}
          className="w-full flex items-center justify-center gap-2 bg-black text-white py-4 rounded-xl font-semibold text-lg hover:bg-gray-900 transition-colors active:scale-[0.98]"
        >
          <Lock className="h-5 w-5" />
          Unlock Ideator
        </button>
      </div>
    </div>
  );
}
