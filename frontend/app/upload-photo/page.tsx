'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, Camera, X, Check } from 'lucide-react';
import Image from 'next/image';

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

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
      router.push('/'); // Redirect to main app
    }, 2000);
  };

  const handleSkip = () => {
    if (confirm('Are you sure you want to skip? Adding a photo increases your chances of getting matches!')) {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-lg border border-pink-100">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Camera className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Add Your Best Photo
          </h1>
          <p className="text-gray-600">
            Profiles with photos get 10x more matches!
          </p>
        </div>

        <form onSubmit={handleUpload} className="space-y-6">
          {/* Photo Upload Area */}
          <div className="relative">
            {!selectedImage ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-3 border-dashed border-gray-300 rounded-2xl p-12 text-center cursor-pointer hover:border-pink-400 hover:bg-pink-50 transition-all"
              >
                <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-700 font-semibold mb-2">
                  Click to upload your photo
                </p>
                <p className="text-gray-500 text-sm">
                  JPG, PNG or GIF (Max 5MB)
                </p>
              </div>
            ) : (
              <div className="relative rounded-2xl overflow-hidden border-4 border-pink-200">
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="w-full h-96 object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-all"
                >
                  <X className="w-5 h-5" />
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

          {/* Photo Guidelines */}
          <div className="bg-pink-50 rounded-xl p-4 border border-pink-100">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Check className="w-5 h-5 text-pink-600" />
              Photo Tips
            </h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>✓ Clear face photo with good lighting</li>
              <li>✓ Smile and look friendly</li>
              <li>✓ Recent photo (within last year)</li>
              <li>✗ No group photos or sunglasses</li>
            </ul>
          </div>

          {/* Upload Button */}
          <button
            type="submit"
            disabled={!selectedImage || isUploading}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            {isUploading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                Continue with Photo
              </>
            )}
          </button>

          {/* Skip Button */}
          <button
            type="button"
            onClick={handleSkip}
            className="w-full text-gray-600 hover:text-gray-800 py-2 text-sm transition-colors"
          >
            Skip for now
          </button>
        </form>

        {/* Privacy Note */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-xs text-gray-600 text-center">
            🔒 Your photo will be reviewed to ensure it meets our community guidelines
          </p>
        </div>
      </div>
    </div>
  );
}
