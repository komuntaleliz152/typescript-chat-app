'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, X } from 'lucide-react';

export default function UploadPhotoPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleContinue = async () => {
    if (!selectedImage) {
      alert('Please select a photo first');
      return;
    }

    setIsUploading(true);

    // Simulate upload
    setTimeout(() => {
      // TODO: Replace with actual API call to upload photo
      console.log('Uploading photo...');
      setIsUploading(false);
      router.push('/age-preference'); // Go to step 2
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header with step number */}
      <div className="text-center pt-12 pb-8">
        <div className="text-8xl font-bold text-pink-600 mb-8">1</div>
        <h1 className="text-4xl font-normal text-gray-800">
          Add your best photo
        </h1>
      </div>

      {/* Photo Upload Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 pb-32">
        <div className="relative">
          {!selectedImage ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-[500px] h-[500px] bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 transition-all relative"
            >
              {/* Plus button */}
              <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 rounded-full flex items-center justify-center shadow-lg transition-all cursor-pointer">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </div>
          ) : (
            <div className="relative w-[500px] h-[500px] rounded-lg overflow-hidden border-2 border-gray-300">
              <img
                src={selectedImage}
                alt="Selected"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Pro tips - directly below the box */}
        <p className="text-gray-700 text-center mt-8 max-w-2xl">
          <span className="font-semibold">Pro tips:</span> Use a bright and clear recent photo just of you. Avoid poor quality, dark or altered images.
        </p>
      </div>

      {/* Bottom section with buttons */}
      <div className="bg-white border-t border-gray-200 py-6 px-8">
        <div className="max-w-4xl mx-auto">
          {/* Button */}
          <div className="flex items-center justify-center">
            <button
              onClick={handleContinue}
              disabled={!selectedImage || isUploading}
              className="px-12 py-3 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 disabled:from-pink-200 disabled:to-rose-200 text-white rounded-lg font-medium transition-all disabled:cursor-not-allowed"
            >
              {isUploading ? 'Uploading...' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
