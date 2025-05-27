import { useNavigate } from '@tanstack/react-router';
import { useState, useEffect } from 'react';

// Mock navigate hook for demonstration

export const DashBord = () => {
  const navigate = useNavigate();
  const [diceRotation, setDiceRotation] = useState(0);
  type Coin = { id: number; delay: number; x: number; y: number };
  const [coins, setCoins] = useState<Coin[]>([]);

  // Animated dice rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setDiceRotation((prev) => prev + 90);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Floating elements
  useEffect(() => {
    const newCoins = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      delay: i * 0.3,
      x: 10 + i * 12,
      y: 20 + (i % 3) * 25,
    }));
    setCoins(newCoins);
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden flex flex-col'>
      {/* Animated Background Elements */}
      <div className='absolute inset-0'>
        {/* Floating dice and game elements */}
        <div className='absolute top-16 left-16 w-12 h-12 bg-red-500/20 rounded-lg animate-float'></div>
        <div className='absolute top-32 right-20 w-10 h-10 bg-yellow-400/20 rounded-full animate-bounce'></div>
        <div className='absolute bottom-32 left-12 w-8 h-8 bg-green-400/20 rotate-45 animate-spin-slow'></div>
        <div className='absolute bottom-20 right-16 w-14 h-14 bg-pink-400/20 rounded-lg animate-wiggle'></div>

        {/* Floating coins */}
        {coins.map((coin) => (
          <div
            key={coin.id}
            className='absolute w-6 h-6 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full animate-float opacity-30'
            style={{
              left: `${coin.x}%`,
              top: `${coin.y}%`,
              animationDelay: `${coin.delay}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          >
            <div className='w-full h-full rounded-full border border-yellow-300 flex items-center justify-center text-xs font-bold text-yellow-900'>
              $
            </div>
          </div>
        ))}

        {/* Geometric shapes */}
        <div className='absolute top-1/4 left-1/4 w-16 h-16 border-2 border-white/10 rotate-45 animate-pulse'></div>
        <div className='absolute top-3/4 right-1/4 w-20 h-20 border-2 border-purple-300/10 rounded-full animate-bounce'></div>
      </div>

      {/* Header */}
      <header className='relative z-10 pt-8 pb-4'>
        <div className='container mx-auto px-6'>
          <div className='flex items-center justify-center space-x-4 animate-slideInDown'>
            <div className='relative'>
              <div
                className='w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl shadow-2xl transform transition-transform duration-500'
                style={{ transform: `rotate(${diceRotation}deg)` }}
              >
                <div className='absolute inset-2 bg-white rounded-lg flex items-center justify-center'>
                  <div className='grid grid-cols-2 gap-1'>
                    <div className='w-2 h-2 bg-red-500 rounded-full'></div>
                    <div className='w-2 h-2 bg-red-500 rounded-full'></div>
                    <div className='w-2 h-2 bg-red-500 rounded-full'></div>
                    <div className='w-2 h-2 bg-red-500 rounded-full'></div>
                  </div>
                </div>
              </div>
            </div>
            <h1 className='text-4xl font-black text-white tracking-tight'>
              DiceyDecisions
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='relative z-10 flex-1 flex flex-col items-center justify-center px-6'>
        <div className='text-center mb-12'>
          {/* Welcome Message */}
          <div className='animate-fadeInUp'>
            <h2 className='text-5xl md:text-6xl font-black text-white mb-4 leading-tight'>
              Ready to
              <span className='block bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-pulse'>
                Decide?
              </span>
            </h2>
          </div>

          <p className='text-xl text-white/80 mb-12 max-w-lg mx-auto animate-fadeInUp animation-delay-300'>
            Choose your adventure and let the games begin!
          </p>

          {/* Interactive Dice */}
          <div className='flex justify-center mb-16 animate-fadeInUp animation-delay-600'>
            <div className='relative group'>
              <div className='w-24 h-24 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl shadow-2xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 cursor-pointer animate-wiggle'>
                <div className='absolute inset-3 bg-white rounded-lg flex items-center justify-center'>
                  <div className='grid grid-cols-3 gap-1'>
                    <div className='w-2 h-2 bg-red-500 rounded-full'></div>
                    <div></div>
                    <div className='w-2 h-2 bg-red-500 rounded-full'></div>
                    <div></div>
                    <div className='w-2 h-2 bg-red-500 rounded-full'></div>
                    <div></div>
                    <div className='w-2 h-2 bg-red-500 rounded-full'></div>
                    <div></div>
                    <div className='w-2 h-2 bg-red-500 rounded-full'></div>
                  </div>
                </div>
              </div>
              <div className='absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full animate-bounce group-hover:scale-125 transition-transform'>
                <div className='w-full h-full flex items-center justify-center text-lg'>
                  ✨
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Action Buttons */}
        <div className='flex flex-col sm:flex-row gap-8 justify-center items-center'>
          <button
            onClick={() => navigate({ to: '/createRoom' })}
            className='group relative px-12 py-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-2xl font-bold rounded-3xl shadow-2xl hover:shadow-green-500/30 transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 animate-slideInLeft animation-delay-900'
          >
            <span className='relative z-10 flex items-center'>
              <span className='text-3xl mr-4'>🎲</span>
              Create a Room
              <svg
                className='ml-3 w-7 h-7 transform group-hover:translate-x-2 transition-transform duration-300'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M12 4v16m8-8H4'
                ></path>
              </svg>
            </span>
            <div className='absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
            <div className='absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-3xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300'></div>
          </button>

          <button
            onClick={() => navigate({ to: '/joinRoom' })}
            className='group relative px-12 py-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-2xl font-bold rounded-3xl shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 animate-slideInRight animation-delay-900'
          >
            <span className='relative z-10 flex items-center'>
              <span className='text-3xl mr-4'>🚪</span>
              Join a Room
              <svg
                className='ml-3 w-7 h-7 transform group-hover:translate-x-2 transition-transform duration-300'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1'
                ></path>
              </svg>
            </span>
            <div className='absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
            <div className='absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300'></div>
          </button>
        </div>

        {/* Subtitle */}
        <p className='text-white/60 text-lg mt-12 animate-fadeInUp animation-delay-1200'>
          Let the dice decide your fate! 🎯
        </p>
      </main>

      {/* Footer */}
      <footer className='relative z-10 py-6 text-center'>
        <p className='text-white/40 animate-fadeIn animation-delay-1500'>
          © 2024 DiceyDecisions 🎲
        </p>
      </footer>

      <style>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(180deg);
          }
        }

        @keyframes wiggle {
          0%,
          100% {
            transform: rotate(-2deg);
          }
          50% {
            transform: rotate(2deg);
          }
        }

        @keyframes slideInDown {
          0% {
            opacity: 0;
            transform: translateY(-30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          0% {
            opacity: 0;
            transform: translateX(-50px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          0% {
            opacity: 0;
            transform: translateX(50px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        .animate-wiggle {
          animation: wiggle 3s ease-in-out infinite;
        }
        .animate-slideInDown {
          animation: slideInDown 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
          opacity: 0;
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        .animation-delay-900 {
          animation-delay: 0.9s;
        }
        .animation-delay-1200 {
          animation-delay: 1.2s;
        }
        .animation-delay-1500 {
          animation-delay: 1.5s;
        }
      `}</style>
    </div>
  );
};
