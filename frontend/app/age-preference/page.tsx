'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function AgePreferencePage() {
  const router = useRouter();
  const [minAge, setMinAge] = useState('27');
  const [maxAge, setMaxAge] = useState('49');

  const handleContinue = () => {
    // TODO: Save age preferences to backend
    console.log('Age preferences:', { minAge, maxAge });
    router.push('/location-preference'); // Go to step 3
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header with step number */}
      <div className="text-center pt-12 pb-8">
        <div className="text-8xl font-bold text-pink-600 mb-8">2</div>
        <h1 className="text-3xl font-normal text-gray-800 mb-4">
          What age group best fits your dating preferences?
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto px-4">
          Refine your search to find individuals who are within the age range that you find most compatible.
        </p>
      </div>

      {/* Age Range Selectors */}
      <div className="flex-1 flex items-center justify-center px-4 pb-32">
        <div className="flex items-center gap-8">
          {/* Min Age */}
          <div className="relative">
            <select
              value={minAge}
              onChange={(e) => setMinAge(e.target.value)}
              className="w-48 px-6 py-4 text-center text-xl border-b-2 border-gray-300 focus:border-pink-500 focus:outline-none bg-transparent appearance-none cursor-pointer text-gray-800"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.5rem center',
                backgroundSize: '1.5rem',
              }}
            >
              {Array.from({ length: 63 }, (_, i) => i + 18).map((age) => (
                <option key={age} value={age}>
                  {age}
                </option>
              ))}
            </select>
          </div>

          {/* Separator */}
          <div className="text-gray-400 text-2xl">—</div>

          {/* Max Age */}
          <div className="relative">
            <select
              value={maxAge}
              onChange={(e) => setMaxAge(e.target.value)}
              className="w-48 px-6 py-4 text-center text-xl border-b-2 border-gray-300 focus:border-pink-500 focus:outline-none bg-transparent appearance-none cursor-pointer text-gray-800"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.5rem center',
                backgroundSize: '1.5rem',
              }}
            >
              {Array.from({ length: 63 }, (_, i) => i + 18).map((age) => (
                <option key={age} value={age}>
                  {age}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Bottom section with buttons */}
      <div className="bg-white border-t border-gray-200 py-6 px-8">
        <div className="max-w-4xl mx-auto">
          {/* Buttons */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handleBack}
              className="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-all flex items-center gap-2"
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </button>
            <button
              onClick={handleContinue}
              className="px-12 py-3 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white rounded-lg font-medium transition-all"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
