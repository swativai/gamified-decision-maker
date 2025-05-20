import React, { useState } from 'react';
import { useUserSignupMutation } from '../../api/signupApi';
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
      setFormData({ username: '', email: '', password: '', phone: '' });
    } catch (err) {
      console.error('Signup failed:', err);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100'>
      <div className='bg-white p-8 rounded-2xl shadow-md w-full max-w-md'>
        <h2 className='text-2xl font-bold text-center text-blue-600 mb-6'>
          Create an Account
        </h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <input
            type='text'
            name='username'
            placeholder='Username'
            value={formData.username}
            onChange={handleChange}
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
            required
          />
          <input
            type='email'
            name='email'
            placeholder='Email'
            value={formData.email}
            onChange={handleChange}
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
            required
          />
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={formData.password}
            onChange={handleChange}
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
            required
          />
          <input
            type='text'
            name='phone'
            placeholder='Phone Number'
            value={formData.phone}
            onChange={handleChange}
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
            required
          />

          <button
            type='submit'
            disabled={isLoading}
            className='w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200'
          >
            {isLoading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        {isSuccess && (
          <p className='text-green-600 mt-4 text-center'>Signup successful!</p>
        )}
        {isError && (
          <p className='text-red-600 mt-4 text-center'>
            Signup failed. Please try again.
          </p>
        )}
      </div>
    </div>
  );
};
