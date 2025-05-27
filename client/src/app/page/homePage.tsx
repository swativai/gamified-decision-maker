import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';

export const HomePage = () => {
  const [diceRotation, setDiceRotation] = useState(0);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const scenarios = [
    'Where should we go out?',
    "Who's doing dishes tonight?",
    'Which show should we binge?',
    "What's for dinner tonight?",
    'Which movie to watch?',
    'Who picks the playlist?',
  ];

  useEffect(() => {
    setIsVisible(true);
    const diceInterval = setInterval(() => {
      setDiceRotation((prev) => prev + 90);
    }, 3000);

    const scenarioInterval = setInterval(() => {
      setCurrentScenario((prev) => (prev + 1) % scenarios.length);
    }, 2500);

    return () => {
      clearInterval(diceInterval);
      clearInterval(scenarioInterval);
    };
  }, [scenarios.length]);

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden'>
      {/* Animated Background Elements */}
      <div className='absolute inset-0'>
        {/* Floating Dice */}
        <div
          className='absolute top-20 left-20 w-8 h-8 bg-white bg-opacity-20 rounded-lg animate-bounce'
          style={{ animationDelay: '0s', animationDuration: '3s' }}
        ></div>
        <div
          className='absolute top-40 right-32 w-6 h-6 bg-yellow-400 bg-opacity-30 rounded-lg animate-bounce'
          style={{ animationDelay: '1s', animationDuration: '2.5s' }}
        ></div>
        <div
          className='absolute bottom-32 left-16 w-10 h-10 bg-pink-400 bg-opacity-25 rounded-lg animate-bounce'
          style={{ animationDelay: '2s', animationDuration: '4s' }}
        ></div>

        {/* Floating Orbs */}
        <div
          className='absolute top-1/4 right-1/4 w-64 h-64 bg-purple-400 bg-opacity-10 rounded-full animate-pulse'
          style={{ filter: 'blur(40px)' }}
        ></div>
        <div
          className='absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-400 bg-opacity-15 rounded-full animate-ping'
          style={{ animationDuration: '5s', filter: 'blur(60px)' }}
        ></div>
      </div>

      {/* Main Content */}
      <div className='relative z-10 min-h-screen flex flex-col'>
        {/* Header */}
        <header className='pt-8 pb-4'>
          <div className='container mx-auto px-6 text-center'>
            <div
              className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}
            >
              <div className='inline-flex items-center space-x-4 mb-4'>
                <div
                  className='w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl shadow-2xl flex items-center justify-center transform transition-transform duration-500'
                  style={{ transform: `rotate(${diceRotation}deg)` }}
                >
                  <div className='grid grid-cols-2 gap-1 p-2'>
                    <div className='w-2 h-2 bg-white rounded-full'></div>
                    <div className='w-2 h-2 bg-white rounded-full'></div>
                    <div className='w-2 h-2 bg-white rounded-full'></div>
                    <div className='w-2 h-2 bg-white rounded-full'></div>
                  </div>
                </div>
                <h1 className='text-5xl md:text-6xl font-bold text-white'>
                  <span className='bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent'>
                    DiceyDecisions
                  </span>
                </h1>
              </div>
              <p className='text-xl md:text-2xl text-blue-200 font-medium'>
                Gamified Decision-Maker for Friend Groups
              </p>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main className='flex-1 flex items-center justify-center px-6'>
          <div className='max-w-6xl mx-auto text-center'>
            {/* Animated Question */}
            <div
              className={`mb-12 transform transition-all duration-700 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
              style={{ transitionDelay: '0.3s' }}
            >
              <div className='bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-8 mb-8 border border-white border-opacity-20 shadow-2xl'>
                <div className='text-3xl md:text-4xl font-bold text-white mb-4'>
                  "
                  <span
                    className='bg-gradient-to-r from-yellow-300 to-pink-400 bg-clip-text text-transparent transition-all duration-500'
                    key={currentScenario}
                  >
                    {scenarios[currentScenario]}
                  </span>
                  "
                </div>
                <div className='flex justify-center space-x-2'>
                  <div
                    className='w-2 h-2 bg-yellow-400 rounded-full animate-bounce'
                    style={{ animationDelay: '0s' }}
                  ></div>
                  <div
                    className='w-2 h-2 bg-pink-400 rounded-full animate-bounce'
                    style={{ animationDelay: '0.2s' }}
                  ></div>
                  <div
                    className='w-2 h-2 bg-purple-400 rounded-full animate-bounce'
                    style={{ animationDelay: '0.4s' }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Feature Description */}
            <div
              className={`mb-12 transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: '0.6s' }}
            >
              <div className='grid md:grid-cols-3 gap-8 mb-12'>
                {/* Create Rooms */}
                <div className='bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105'>
                  <div className='w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg'>
                    <svg
                      className='w-8 h-8 text-white'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M12 4v16m8-8H4'
                      />
                    </svg>
                  </div>
                  <h3 className='text-xl font-bold text-white mb-2'>
                    Create Decision Rooms
                  </h3>
                  <p className='text-blue-400'>
                    Set up voting rooms for your group decisions in seconds
                  </p>
                </div>

                {/* Secret Voting */}
                <div className='bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105'>
                  <div className='w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg'>
                    <svg
                      className='w-8 h-8 text-white'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                      />
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                      />
                    </svg>
                  </div>
                  <h3 className='text-xl font-bold text-white mb-2'>
                    Secret Voting
                  </h3>
                  <p className='text-blue-400'>
                    Vote anonymously to avoid bias and group pressure
                  </p>
                </div>

                {/* Dice Tiebreakers */}
                <div className='bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105'>
                  <div className='w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg'>
                    <div className='grid grid-cols-2 gap-1'>
                      <div className='w-2 h-2 bg-white rounded-full'></div>
                      <div className='w-2 h-2 bg-white rounded-full'></div>
                      <div className='w-2 h-2 bg-white rounded-full'></div>
                      <div className='w-2 h-2 bg-white rounded-full'></div>
                    </div>
                  </div>
                  <h3 className='text-xl font-bold text-white mb-2'>
                    Dramatic Reveals
                  </h3>
                  <p className='text-blue-400'>
                    Break ties with dice, spinners, and coin flips
                  </p>
                </div>
              </div>

              <div className='text-center mb-12'>
                <h2 className='text-3xl md:text-4xl font-bold text-white mb-6'>
                  Stop Wasting Time on Simple Decisions
                </h2>
                <p className='text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed'>
                  Whether you're choosing restaurants with friends, assigning
                  chores with roommates, or picking shows with coworkers —{' '}
                  <span className='text-yellow-300 font-semibold'>
                    DiceyDecisions
                  </span>{' '}
                  makes group choices fun, fair, and fast with gamified voting
                  and randomized tiebreakers.
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div
              className={`transform transition-all duration-700 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
              style={{ transitionDelay: '0.9s' }}
            >
              <div className='flex flex-col sm:flex-row gap-6 justify-center items-center'>
                {/* Sign Up Button */}
                <div className='relative group'>
                  <div className='absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl blur opacity-70 group-hover:opacity-100 transition-opacity duration-300'></div>
                  <button
                    onClick={() => {
                      navigate({ to: '/signup' });
                    }}
                    className='relative bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-xl px-12 py-4 rounded-2xl hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-2xl min-w-48'
                  >
                    <div className='flex items-center justify-center space-x-3'>
                      <svg
                        className='w-6 h-6'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z'
                        />
                      </svg>
                      <span>Sign Up</span>
                    </div>
                  </button>
                </div>

                {/* Login Button */}
                <div className='relative group'>
                  <div className='absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl blur opacity-70 group-hover:opacity-100 transition-opacity duration-300'></div>
                  <button
                    onClick={() => {
                      navigate({ to: '/login' });
                    }}
                    className='relative bg-white bg-opacity-10 backdrop-blur-lg text-blue font-bold text-xl px-12 py-4 rounded-2xl border-2 border-white border-opacity-30 hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-2xl min-w-48'
                  >
                    <div className='flex items-center justify-center space-x-3'>
                      <svg
                        className='w-6 h-6'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1'
                        />
                      </svg>
                      <span>Login</span>
                    </div>
                  </button>
                </div>
              </div>

              <p className='text-blue-300 mt-8 text-lg'>
                Join the fun and make group decisions effortless! 🎲✨
              </p>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className='py-8 text-center'>
          <p className='text-blue-300 text-sm'>
            © 2025 DiceyDecisions. Making group choices fun since today! 🎯
          </p>
        </footer>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};
