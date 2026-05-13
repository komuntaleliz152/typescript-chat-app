'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SignupModal from '@/components/SignupModal';

export default function LandingPage() {
  const router = useRouter();
  const [showSignupModal, setShowSignupModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0b2e] via-[#2d1b4e] to-[#1a0b2e] text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-4 bg-purple-900/30 backdrop-blur-sm fixed w-full z-50 border-b border-purple-700/30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-xl font-semibold">Penda</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-800/50 rounded-lg hover:bg-purple-700/50 transition-colors border border-purple-600/30">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
            English
          </button>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-2 bg-gradient-to-r from-pink-500 to-rose-600 rounded-lg font-semibold hover:from-pink-600 hover:to-rose-700 transition-all"
          >
            Login
          </button>
        </div>
      </nav>

      {/* Hero Section with Photo Grid */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Photo Grid Background */}
        <div className="absolute inset-0 grid grid-cols-6 gap-4 p-4 opacity-60">
          {[
            'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
            'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400',
            'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400',
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400',
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
            'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400',
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
            'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400',
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
            'https://images.unsplash.com/photo-1557862921-37829c790f19?w=400',
            'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=400',
            'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=400',
            'https://images.unsplash.com/photo-1521119989659-a83eee488004?w=400',
            'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=400',
            'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
            'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
            'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
            'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400',
            'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400',
            'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=400',
          ].map((url, i) => {
            const rotations = [2, -3, 1, -2, 3, -1, 2, -3, 1, -2, 3, -1, 2, -3, 1, -2, 3, -1, 2, -3, 1, -2, 3, -1];
            return (
              <div
                key={i}
                className="aspect-square rounded-lg overflow-hidden"
                style={{
                  transform: `rotate(${rotations[i]}deg)`,
                }}
              >
                <img
                  src={url}
                  alt="Person"
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0b2e]/90 via-[#2d1b4e]/80 to-[#1a0b2e]/90" />

        {/* Content */}
        <div className="relative z-10 text-center px-8 max-w-4xl">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Find someone<br />
            who <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-500">truly</span> gets<br />
            you
          </h1>
          <p className="text-2xl text-gray-300 mb-8">
            Penda connects real people through genuine conversations. Swipe less, connect more. No games, just real connections that matter.
          </p>
          <button
            onClick={() => setShowSignupModal(true)}
            className="px-10 py-4 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 rounded-full text-xl font-semibold transition-all shadow-lg shadow-pink-500/30"
          >
            💕 Meet Singles
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-[#1a0b2e] to-[#2d1b4e]">
        <div className="container mx-auto px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Built for real connections</h2>
          <div className="grid grid-cols-3 gap-8">
            {[
              {
                icon: '🔒',
                title: 'Safe & verified',
                desc: 'All profiles are verified. Your safety is our priority.',
              },
              {
                icon: '🎯',
                title: 'Match your vibe',
                desc: 'Our algorithm finds people who share your interests and values.',
              },
              {
                icon: '💬',
                title: 'Real conversations',
                desc: 'Start meaningful conversations that lead to real relationships',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-purple-900/30 rounded-2xl p-8 text-center hover:bg-purple-800/30 transition-all border border-purple-700/30"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#2d1b4e]">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-4 gap-8 text-center">
            {[
              { number: '4.5M+', label: 'Active Members' },
              { number: '50+', label: 'Countries' },
              { number: '100K+', label: 'Success Stories' },
              { number: '24/7', label: 'Support' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-500 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-[#1a0b2e]">
        <div className="container mx-auto px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Three simple steps</h2>
          <div className="grid grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Create your profile', desc: 'Add photos, write your bio, and share what makes you unique' },
              { step: '2', title: 'Like and match', desc: 'Swipe through profiles and connect with people you like' },
              { step: '3', title: 'Start chatting', desc: 'Break the ice and start meaningful conversations' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-[#2d1b4e] to-[#1a0b2e] text-center">
        <div className="container mx-auto px-8">
          <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
            💕
          </div>
          <h2 className="text-5xl font-bold mb-6">Ready to find your person?</h2>
          <p className="text-xl text-gray-400 mb-8">
            Join 500,000+ people across the world who are already on Penda
          </p>
          <button
            onClick={() => setShowSignupModal(true)}
            className="px-12 py-4 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 rounded-full text-xl font-semibold transition-all shadow-lg shadow-pink-500/30"
          >
            💕 Meet Singles
          </button>
          <p className="text-gray-500 text-sm mt-4">No credit card required • Free forever</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a0b2e] border-t border-purple-800/30 py-8">
        <div className="container mx-auto px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="font-semibold">Penda</span>
          </div>
          <div className="flex gap-6 text-gray-400 text-sm">
            <a href="#" className="hover:text-white transition-colors">About</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>

      {/* Signup Modal */}
      <SignupModal isOpen={showSignupModal} onClose={() => setShowSignupModal(false)} />
    </div>
  );
}
