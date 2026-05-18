'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function LocationPreferencePage() {
  const router = useRouter();
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');

  const handleContinue = () => {
    // TODO: Save location preferences to backend
    console.log('Location preferences:', { country, state, city });
    router.push('/relationship-type'); // Go to step 4
  };

  const handleBack = () => {
    router.back();
  };

  // Sample countries - replace with actual data
  const countries = [
    'Any Country',
    'United States',
    'United Kingdom',
    'Canada',
    'Australia',
    'Germany',
    'France',
    'Spain',
    'Italy',
    'Brazil',
    'Mexico',
    'South Africa',
    'Nigeria',
    'Kenya',
    'Ghana',
  ];

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

      {/* Header with step number */}
      <div className="text-center pt-12 pb-8">
        <div className="text-8xl font-bold text-pink-600 mb-8">3</div>
        <h1 className="text-3xl font-normal text-gray-800 mb-4">
          What is the preferred location for finding your partner?
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto px-4">
          Are you seeking someone nearby for convenience or open to exploring connections across borders?
        </p>
      </div>

      {/* Location Selectors */}
      <div className="flex-1 flex items-center justify-center px-4 pb-32">
        <div className="w-full max-w-3xl">
          <div className="grid grid-cols-3 gap-8">
            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-pink-500 focus:outline-none bg-transparent appearance-none cursor-pointer text-gray-800"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0.5rem center',
                  backgroundSize: '1.5rem',
                }}
              >
                <option value="">Any Country</option>
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* State/Province */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State/Province
              </label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="Any State"
                className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-pink-500 focus:outline-none bg-transparent text-gray-800 placeholder:text-gray-400"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Any City"
                className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-pink-500 focus:outline-none bg-transparent text-gray-800 placeholder:text-gray-400"
              />
            </div>
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
