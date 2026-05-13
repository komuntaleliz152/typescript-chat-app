'use client';

import { useState } from 'react';
import { Eye, EyeOff, Shield, Check } from 'lucide-react';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignupModal({ isOpen, onClose }: SignupModalProps) {
  const [firstName, setFirstName] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('female');
  const [lookingFor, setLookingFor] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      alert('Please agree to the Terms of Use and Privacy Statement');
      return;
    }
    // Handle signup logic here
    console.log({ firstName, gender, lookingFor, age, email, password });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 text-gray-900"
                required
              />
            </div>

            {/* Gender Selection and Age */}
            <div className="grid grid-cols-3 gap-4">
              {/* I'm a */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  I'm a
                </label>
                <div className="flex gap-0 border-2 border-gray-300 rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setGender('male')}
                    className={`flex-1 p-4 transition-all ${
                      gender === 'male'
                        ? 'bg-blue-100 border-r-2 border-gray-300'
                        : 'bg-white border-r-2 border-gray-300'
                    }`}
                  >
                    <svg className="w-12 h-12 mx-auto text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-1.5 5h3c.8 0 1.5.7 1.5 1.5v6.5h-1.5v7h-3v-7H9V8.5C9 7.7 9.7 7 10.5 7z"/>
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender('female')}
                    className={`flex-1 p-4 transition-all ${
                      gender === 'female'
                        ? 'bg-pink-100'
                        : 'bg-white'
                    }`}
                  >
                    <svg className="w-12 h-12 mx-auto text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="4" r="2"/>
                      <path d="M15.5 7h-7L6 16h3v6h6v-6h3z"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* I'm looking for */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  I'm looking for
                </label>
                <div className="flex gap-0 border-2 border-gray-300 rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setLookingFor('male')}
                    className={`flex-1 p-4 transition-all ${
                      lookingFor === 'male'
                        ? 'bg-blue-100 border-r-2 border-gray-300'
                        : 'bg-white border-r-2 border-gray-300'
                    }`}
                  >
                    <svg className="w-12 h-12 mx-auto text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-1.5 5h3c.8 0 1.5.7 1.5 1.5v6.5h-1.5v7h-3v-7H9V8.5C9 7.7 9.7 7 10.5 7z"/>
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => setLookingFor('female')}
                    className={`flex-1 p-4 transition-all ${
                      lookingFor === 'female'
                        ? 'bg-pink-100'
                        : 'bg-white'
                    }`}
                  >
                    <svg className="w-12 h-12 mx-auto text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="4" r="2"/>
                      <path d="M15.5 7h-7L6 16h3v6h6v-6h3z"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Age */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Age
                </label>
                <select
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 text-gray-900 bg-white appearance-none cursor-pointer h-[76px]"
                  required
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.75rem center',
                    backgroundSize: '1.5rem',
                  }}
                >
                  <option value="">Select</option>
                  {Array.from({ length: 63 }, (_, i) => i + 18).map((ageNum) => (
                    <option key={ageNum} value={ageNum}>
                      {ageNum}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 text-gray-900 placeholder:text-gray-400"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your Penda password"
                  className="w-full px-4 py-3 pr-12 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 text-gray-900 placeholder:text-gray-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="w-5 h-5 mt-0.5 border-2 border-gray-300 rounded focus:ring-2 focus:ring-pink-500 cursor-pointer"
              />
              <label htmlFor="terms" className="text-gray-700 text-sm cursor-pointer">
                Yes, I confirm that I am over 18 and agree to the{' '}
                <a href="#" className="font-semibold text-gray-900 hover:underline">
                  Terms of Use
                </a>{' '}
                and{' '}
                <a href="#" className="font-semibold text-gray-900 hover:underline">
                  Privacy Statement
                </a>
                .
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white py-4 rounded-lg font-semibold text-lg transition-all shadow-lg flex items-center justify-center gap-3"
            >
              <Shield className="w-6 h-6" />
              Meet Singles
            </button>

            {/* TrustedSite Badge and Close */}
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-2">
                <div className="bg-pink-500 rounded p-1">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">
                    Trusted<span className="text-pink-600">Site</span>
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">Secure Form</div>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 font-medium text-lg"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
