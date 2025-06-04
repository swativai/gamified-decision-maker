// src/pages/JoinRoomPage.tsx
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useJoinWithCodeMutation } from '../../api/join-with-code';

export const JoinRoomWithCode = () => {
  const [roomCode, setRoomCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [joinWithCode, { isLoading }] = useJoinWithCodeMutation();

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!roomCode.trim()) {
      setError('Room code is required');
      return;
    }

    try {
      const res = await joinWithCode({ roomCode }).unwrap();
      console.log('response', res);

      navigate({
        to: '/vottingRoom/$roomCode',
        params: { roomCode: res.roomId },
      });
    } catch (err) {
      setError(
        typeof err === 'object' && err !== null && 'message' in err
          ? String((err as { message?: string }).message)
          : String(err),
      );
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 px-4 relative overflow-hidden'>
      {/* Background decorative elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute -top-40 -right-40 w-80 h-80 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse'></div>
        <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse animation-delay-1000'></div>
        <div className='absolute top-20 left-1/2 w-60 h-60 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse animation-delay-2000'></div>
      </div>

      {/* Floating icons */}
      <div className='absolute top-10 left-10 text-emerald-400 opacity-30 animate-bounce'>
        <svg className='w-8 h-8' fill='currentColor' viewBox='0 0 20 20'>
          <path
            fillRule='evenodd'
            d='M18 8a6 6 0 01-7.743 5.743L10 14l-0.257-0.257A6 6 0 1118 8zM2 8a6 6 0 1010.257 5.743L12 14l-0.257-0.257A6 6 0 012 8z'
            clipRule='evenodd'
          />
        </svg>
      </div>
      <div className='absolute top-20 right-20 text-teal-400 opacity-30 animate-bounce animation-delay-500'>
        <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 20 20'>
          <path d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
        </svg>
      </div>
      <div className='absolute bottom-20 left-1/4 text-cyan-400 opacity-30 animate-bounce animation-delay-1000'>
        <svg className='w-7 h-7' fill='currentColor' viewBox='0 0 20 20'>
          <path
            fillRule='evenodd'
            d='M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
            clipRule='evenodd'
          />
        </svg>
      </div>

      <form
        onSubmit={handleJoin}
        className='relative bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/30 transform hover:scale-105 transition-all duration-300 hover:shadow-3xl'
      >
        {/* Header Section */}
        <div className='text-center mb-8'>
          <div className='mx-auto w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mb-4 shadow-lg animate-pulse'>
            <svg
              className='w-10 h-10 text-white'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
              />
            </svg>
          </div>
          <h2 className='text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2'>
            Join a Room
          </h2>
          <p className='text-gray-600 text-sm'>
            Enter the room code to join the voting session
          </p>
        </div>

        {/* Input Section */}
        <div className='space-y-6'>
          <div className='relative group'>
            <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
              <svg
                className='h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors duration-200'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M7 20l4-16m2 16l4-16M6 9h14M4 15h14'
                />
              </svg>
            </div>
            <input
              type='text'
              placeholder='Enter Room Code'
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              className='w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm hover:bg-white/90 text-lg font-mono tracking-wider uppercase placeholder:normal-case placeholder:tracking-normal placeholder:font-sans'
            />
            <div className='absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-focus-within:opacity-10 transition-opacity duration-200 pointer-events-none'></div>
          </div>

          {/* Error Message */}
          {error && (
            <div className='bg-red-50 border-l-4 border-red-400 p-4 rounded-lg animate-shake'>
              <div className='flex items-center'>
                <svg
                  className='h-5 w-5 text-red-400 mr-3'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
                <p className='text-red-700 text-sm font-medium'>
                  Room Code Is Invalid
                </p>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type='submit'
            disabled={isLoading}
            className='w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group'
          >
            {isLoading && (
              <div className='absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-700'>
                <div className='flex items-center justify-center h-full'>
                  <svg
                    className='animate-spin -ml-1 mr-3 h-6 w-6 text-white'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    ></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    ></path>
                  </svg>
                  Joining...
                </div>
              </div>
            )}
            <div
              className={`flex items-center justify-center ${isLoading ? 'invisible' : 'visible'}`}
            >
              <svg
                className='w-5 h-5 mr-2 group-hover:animate-bounce'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1'
                />
              </svg>
              {isLoading ? 'Joining...' : 'Join Room'}
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className='mt-8 text-center'>
          <p className='text-gray-500 text-sm'>
            Need help?
            <span className='text-emerald-600 hover:text-emerald-700 cursor-pointer font-medium ml-1 hover:underline transition-colors duration-200'>
              Contact support
            </span>
          </p>
        </div>

        {/* Decorative elements */}
        <div className='absolute -top-2 -right-2 w-4 h-4 bg-emerald-400 rounded-full animate-ping'></div>
        <div className='absolute -bottom-2 -left-2 w-3 h-3 bg-teal-400 rounded-full animate-ping animation-delay-1000'></div>
      </form>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-3px); }
          20%, 40%, 60%, 80% { transform: translateX(3px); }
        }

        .animate-shake {
          animation: shake 0.6s ease-in-out;
        }

        .animation-delay-500 {
          animation-delay: 0.5s;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
};
