'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function RelationshipTypePage() {
  const router = useRouter();
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const relationshipTypes = [
    'Penpal',
    'Friendship',
    'Romance / Dating',
    'Long Term Relationship',
  ];

  const toggleType = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const handleContinue = () => {
    // TODO: Save relationship type preferences to backend
    console.log('Relationship types:', selectedTypes);
    router.push('/ethnicity'); // Go to step 5
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header - Penda branding */}
      <div className="bg-gradient-to-r from-pink-600 to-rose-600 py-4 px-8">
        <div className="flex items-center gap-2 text-white">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
          <span className="text-xl font-semibold">Penda</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          <p className="text-gray-600 text-center mb-12">
            Honesty helps everyone and you find what they are looking for. You can change your preferences at any time.
          </p>

          {/* Checkbox Options */}
          <div className="space-y-4">
            {relationshipTypes.map((type) => (
              <label
                key={type}
                className="flex items-center gap-4 p-4 bg-white border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-all"
              >
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type)}
                  onChange={() => toggleType(type)}
                  className="w-6 h-6 rounded border-2 border-pink-400 text-pink-600 focus:ring-2 focus:ring-pink-500 cursor-pointer"
                />
                <span className="text-gray-800 text-lg">{type}</span>
              </label>
            ))}
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
              disabled={selectedTypes.length === 0}
              className="px-12 py-3 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 disabled:from-pink-200 disabled:to-rose-200 text-white rounded-lg font-medium transition-all disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
