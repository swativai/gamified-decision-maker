import React, { useState } from 'react';
import { useUserSignupMutation } from '../../api/signupApi';
import { useNavigate } from '@tanstack/react-router';
interface FormData {
  username: string;
  email: string;
  password: string;
  phone: string;
}

export const SignupPage = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    phone: '',
  });
  const navigate = useNavigate();

  const [registerUser, { isLoading, isSuccess, isError }] =
    useUserSignupMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(formData).unwrap();
      alert('Signup successful!');
      navigate({ to: '/home' });
      setFormData({ username: '', email: '', password: '', phone: '' });
    } catch (err) {
      console.error('Signup failed:', err);
    }
  };

  return (
    <div className='relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900'>
      {/* Animated Background Elements */}
      <div className='absolute inset-0'>
        <div className='absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob'></div>
        <div className='absolute top-0 right-0 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000'></div>
        <div className='absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000'></div>
      </div>

      {/* Floating Particles */}
      <div className='absolute inset-0 overflow-hidden'>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className='absolute w-2 h-2 bg-white rounded-full opacity-20 animate-float'
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 20}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className='relative flex items-center justify-center min-h-screen p-4'>
        <div className='bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white/20 transform transition-all duration-700 hover:scale-105 animate-slideUp'>
          {/* Glassmorphism overlay */}
          <div className='absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-3xl'></div>

          <div className='relative z-10'>
            {/* Header with animation */}
            <div className='text-center mb-8 animate-fadeIn'>
              <div className='mx-auto w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mb-4 animate-pulse'>
                <svg
                  className='w-8 h-8 text-white'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                  />
                </svg>
              </div>
              <h2 className='text-3xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text '>
                Create Account
              </h2>
              <p className='text-white/70 text-sm'>
                Join us and start your journey
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className='space-y-6'>
                {/* Username Field */}
                <div
                  className='group animate-slideInLeft'
                  style={{ animationDelay: '0.1s' }}
                >
                  <div className='relative'>
                    <input
                      type='text'
                      name='username'
                      placeholder='Username'
                      value={formData.username}
                      onChange={handleChange}
                      className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 text-white placeholder-white/60 backdrop-blur-sm group-hover:bg-white/15'
                      required
                    />
                    <div className='absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'></div>
                  </div>
                </div>

                {/* Email Field */}
                <div
                  className='group animate-slideInLeft'
                  style={{ animationDelay: '0.2s' }}
                >
                  <div className='relative'>
                    <input
                      type='email'
                      name='email'
                      placeholder='Email'
                      value={formData.email}
                      onChange={handleChange}
                      className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 text-white placeholder-white/60 backdrop-blur-sm group-hover:bg-white/15'
                      required
                    />
                    <div className='absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'></div>
                  </div>
                </div>

                {/* Password Field */}
                <div
                  className='group animate-slideInLeft'
                  style={{ animationDelay: '0.3s' }}
                >
                  <div className='relative'>
                    <input
                      type='password'
                      name='password'
                      placeholder='Password'
                      value={formData.password}
                      onChange={handleChange}
                      className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 text-white placeholder-white/60 backdrop-blur-sm group-hover:bg-white/15'
                      required
                    />
                    <div className='absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'></div>
                  </div>
                </div>

                {/* Phone Field */}
                <div
                  className='group animate-slideInLeft'
                  style={{ animationDelay: '0.4s' }}
                >
                  <div className='relative'>
                    <input
                      type='text'
                      name='phone'
                      placeholder='Phone Number'
                      value={formData.phone}
                      onChange={handleChange}
                      className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 text-white placeholder-white/60 backdrop-blur-sm group-hover:bg-white/15'
                      required
                    />
                    <div className='absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'></div>
                  </div>
                </div>

                {/* Submit Button */}
                <div
                  className='animate-slideInUp'
                  style={{ animationDelay: '0.5s' }}
                >
                  <button
                    type='submit'
                    disabled={isLoading}
                    className='relative w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group overflow-hidden'
                  >
                    <span className='relative z-10 flex items-center justify-center'>
                      {isLoading ? (
                        <>
                          <svg
                            className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
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
                          Signing up...
                        </>
                      ) : (
                        'Sign Up'
                      )}
                    </span>
                    <div className='absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                  </button>
                </div>
              </div>
            </form>
            {/* Status Messages */}
            {isSuccess && (
              <div className='mt-6 p-4 bg-green-500/20 border border-green-400/30 rounded-xl backdrop-blur-sm animate-bounceIn'>
                <p className='text-green-300 text-center font-medium flex items-center justify-center'>
                  <svg
                    className='w-5 h-5 mr-2'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M5 13l4 4L19 7'
                    ></path>
                  </svg>
                  Signup successful!
                </p>
              </div>
            )}

            {isError && (
              <div className='mt-6 p-4 bg-red-500/20 border border-red-400/30 rounded-xl backdrop-blur-sm animate-shake'>
                <p className='text-red-300 text-center font-medium flex items-center justify-center'>
                  <svg
                    className='w-5 h-5 mr-2'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M6 18L18 6M6 6l12 12'
                    ></path>
                  </svg>
                  Signup failed. Please try again.
                </p>
              </div>
            )}

            {/* Footer */}
            <div
              className='mt-8 text-center animate-fadeIn'
              style={{ animationDelay: '0.6s' }}
            >
              <p className='text-white/60 text-sm'>
                Already have an account?{' '}
                <a
                  href='#'
                  className='text-blue-400 hover:text-blue-300 transition-colors duration-200 underline decoration-transparent hover:decoration-current'
                >
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes slideUp {
          0% { opacity: 0; transform: translateY(50px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideInLeft {
          0% { opacity: 0; transform: translateX(-30px); }
          100% { opacity: 1; transform: translateX(0); }
        }

        @keyframes slideInUp {
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

        .animate-blob { animation: blob 7s infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-slideUp { animation: slideUp 0.8s ease-out; }
        .animate-slideInLeft { animation: slideInLeft 0.6s ease-out forwards; opacity: 0; }
        .animate-slideInUp { animation: slideInUp 0.6s ease-out forwards; opacity: 0; }
        .animate-fadeIn { animation: fadeIn 1s ease-out forwards; opacity: 0; }
        .animate-bounceIn { animation: bounceIn 0.6s ease-out; }
        .animate-shake { animation: shake 0.6s ease-in-out; }

        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
};

export default SignupPage;
