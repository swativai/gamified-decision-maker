// components/CreateRoomForm.tsx
import React, { useState } from 'react';
import { useCreateRoomMutation } from '../../api/createRoomApi';
import { useNavigate } from '@tanstack/react-router';

export const CreateNewRoom = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('');
  const [createRoom, { isLoading, isSuccess, isError, error }] =
    useCreateRoomMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await createRoom({
        title,
        description,
        maxParticipants: Number(maxParticipants),
        roomId: '',
        roomCode: '',
      }).unwrap();
      console.log('response', res._id);
      if (res.token) {
        localStorage.setItem('roomToken', res.token);
        console.log('Room token saved to localStorage');
      }
      alert('Room created!');
      setTitle('');
      setDescription('');
      setMaxParticipants('');
      setTimeout(() => {
        // navigate({ to: '/roomsDetails' });
        navigate({ to: '/room/$roomId', params: { roomId: res._id } });
      }, 1000); // Navigate after a short delay
    } catch (err) {
      console.error('Error:', err);
    }
  };
  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const token = localStorage.getItem('token'); // check login status

  //   if (!token) {
  //     const searchParams = new URLSearchParams({
  //       from: 'create',
  //       title,
  //       description,
  //       maxParticipants,
  //     });

  //     navigate({ to: '/login', search: searchParams.toString() });
  //     return;
  //   }

  //   // If logged in, continue creating room
  //   try {
  //     await createRoom({
  //       title,
  //       description,
  //       maxParticipants: Number(maxParticipants),
  //     }).unwrap();

  //     alert('Room created!');
  //     setTitle('');
  //     setDescription('');
  //     setMaxParticipants('');
  //     setTimeout(() => {
  //       navigate({ to: '/roomsDetails' });
  //     }, 1000);
  //   } catch (err) {
  //     console.error('Error:', err);
  //   }
  // };

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden'>
      {/* Animated Background Elements */}
      <div className='absolute inset-0'>
        <div className='absolute top-20 left-20 w-32 h-32 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob'></div>
        <div className='absolute top-40 right-32 w-32 h-32 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000'></div>
        <div className='absolute -bottom-8 left-32 w-32 h-32 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000'></div>

        {/* Floating dice */}
        <div className='absolute top-16 right-16 w-12 h-12 bg-red-500/20 rounded-lg animate-float'></div>
        <div className='absolute bottom-32 left-12 w-10 h-10 bg-green-400/20 rounded-full animate-bounce'></div>
        <div className='absolute top-1/2 left-8 w-8 h-8 bg-yellow-400/20 rotate-45 animate-spin-slow'></div>
      </div>

      {/* Main Container */}
      <div className='relative z-10 flex items-center justify-center min-h-screen p-4'>
        <div className='w-full max-w-lg'>
          {/* Header Section */}
          <div className='text-center mb-8 animate-slideDown'>
            <div className='mx-auto w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 animate-wiggle shadow-2xl'>
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
                  d='M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4'
                ></path>
              </svg>
            </div>
            <h2 className='text-4xl font-black text-white mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text '>
              Create New Room
            </h2>
            <p className='text-white/70 text-lg'>
              Set up your decision-making space
            </p>
          </div>

          {/* Form Container */}
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl animate-slideUp'>
              <div className='space-y-6'>
                {/* Title Field */}
                <div
                  className='group animate-fadeInLeft'
                  style={{ animationDelay: '0.1s' }}
                >
                  <label className=' mb-3 font-semibold text-white text-lg flex items-center'>
                    <span className='mr-2'>🏷️</span>
                    Room Title
                  </label>
                  <div className='relative'>
                    <input
                      type='text'
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className='w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm group-hover:bg-white/15'
                      placeholder='Enter an exciting room title'
                    />
                    <div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'></div>
                  </div>
                </div>

                {/* Description Field */}
                <div
                  className='group animate-fadeInLeft'
                  style={{ animationDelay: '0.2s' }}
                >
                  <label className=' mb-3 font-semibold text-white text-lg flex items-center'>
                    <span className='mr-2'>📝</span>
                    Description
                  </label>
                  <div className='relative'>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      className='w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm resize-none group-hover:bg-white/15'
                      placeholder="Describe what you'll be deciding (optional)"
                    />
                    <div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'></div>
                  </div>
                </div>

                {/* Max Participants Field */}
                <div
                  className='group animate-fadeInLeft'
                  style={{ animationDelay: '0.3s' }}
                >
                  <label className=' mb-3 font-semibold text-white text-lg flex items-center'>
                    <span className='mr-2'>👥</span>
                    Maximum Participants
                  </label>
                  <div className='relative'>
                    <input
                      type='number'
                      min={1}
                      value={maxParticipants}
                      onChange={(e) => setMaxParticipants(e.target.value)}
                      className='w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm group-hover:bg-white/15'
                      placeholder='How many people can join?'
                    />
                    <div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'></div>
                  </div>
                </div>

                {/* Submit Button */}

                <div
                  className='animate-fadeInUp'
                  style={{ animationDelay: '0.4s' }}
                >
                  <button
                    type='submit'
                    disabled={isLoading}
                    className='relative w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-4 rounded-2xl font-bold text-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group overflow-hidden'
                  >
                    <span className='relative z-10 flex items-center justify-center'>
                      {isLoading ? (
                        <>
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
                          Creating Room...
                        </>
                      ) : (
                        <>
                          <span className='text-2xl mr-3'>🎲</span>
                          Create Room
                          <svg
                            className='ml-3 w-6 h-6 transform group-hover:translate-x-1 transition-transform'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M13 7l5 5m0 0l-5 5m5-5H6'
                            ></path>
                          </svg>
                        </>
                      )}
                    </span>
                    <div className='absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl'></div>
                  </button>
                </div>
              </div>

              {/* Status Messages */}
              {isSuccess && (
                <div className='mt-6 p-4 bg-green-500/20 border border-green-400/30 rounded-2xl backdrop-blur-sm animate-bounceIn'>
                  <p className='text-green-300 text-center font-semibold flex items-center justify-center text-lg'>
                    <span className='text-2xl mr-3'>🎉</span>
                    Room created successfully!
                    <span className='text-2xl ml-3'>🎊</span>
                  </p>
                </div>
              )}

              {isError && (
                <div className='mt-6 p-4 bg-red-500/20 border border-red-400/30 rounded-2xl backdrop-blur-sm animate-shake'>
                  <p className='text-red-300 text-center font-semibold flex items-center justify-center text-lg'>
                    <span className='text-2xl mr-3'>❌</span>
                    Error:{' '}
                    {typeof error === 'string'
                      ? error
                      : error && 'status' in error
                        ? `Status: ${error.status}${error.data ? `, ${JSON.stringify(error.data)}` : ''}`
                        : error && 'message' in error
                          ? error.message
                          : 'An unknown error occurred.'}
                  </p>
                </div>
              )}

              {/* Tips Section */}
              <div
                className='mt-8 p-4 bg-blue-500/10 border border-blue-400/20 rounded-2xl backdrop-blur-sm animate-fadeIn'
                style={{ animationDelay: '0.6s' }}
              >
                <h3 className='text-white font-semibold mb-2 flex items-center'>
                  <span className='mr-2'>💡</span>
                  Pro Tips:
                </h3>
                <ul className='text-white/70 text-sm space-y-1'>
                  <li>• Make your title catchy and descriptive</li>
                  <li>• Set a reasonable participant limit</li>
                  <li>• Share the room code with your friends</li>
                </ul>
              </div>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        @keyframes wiggle {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }

        @keyframes slideDown {
          0% { opacity: 0; transform: translateY(-30px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideUp {
          0% { opacity: 0; transform: translateY(50px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeInLeft {
          0% { opacity: 0; transform: translateX(-30px); }
          100% { opacity: 1; transform: translateX(0); }
        }

        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        @keyframes bounceIn {
          0% { opacity: 0; transform: scale(0.3); }
          50% { opacity: 1; transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-blob { animation: blob 7s infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-wiggle { animation: wiggle 2s ease-in-out infinite; }
        .animate-slideDown { animation: slideDown 0.8s ease-out; }
        .animate-slideUp { animation: slideUp 0.8s ease-out; }
        .animate-fadeInLeft { animation: fadeInLeft 0.6s ease-out forwards; opacity: 0; }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; opacity: 0; }
        .animate-fadeIn { animation: fadeIn 1s ease-out forwards; opacity: 0; }
        .animate-bounceIn { animation: bounceIn 0.6s ease-out; }
        .animate-shake { animation: shake 0.6s ease-in-out; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }

        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
};
