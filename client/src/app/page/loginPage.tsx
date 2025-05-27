import { useState } from 'react';
import { useLoginUserMutation } from '../../api/loginApi';
import { useNavigate } from '@tanstack/react-router';

export const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loginUser, { isLoading, error }] = useLoginUserMutation();

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await loginUser(formData).unwrap();

      // Assert the type of res to ensure it has a 'token' property
      if (res.token) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('userId', res.userId);
        alert('Login successful');
        navigate({ to: '/home' });
      }
    } catch (err) {
      alert('Invalid email or password');
      console.log(err);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <form
        onSubmit={handleSubmit}
        className='bg-white p-8 rounded-2xl shadow-xl w-full max-w-md'
      >
        <h2 className='text-2xl font-bold text-center text-gray-800 mb-6'>
          Login
        </h2>
        <div className='mb-4'>
          <input
            type='email'
            name='email'
            placeholder='Enter email'
            value={formData.email}
            onChange={handleChange}
            required
            className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
          />
        </div>
        <div className='mb-6'>
          <input
            type='password'
            name='password'
            placeholder='Enter password'
            value={formData.password}
            onChange={handleChange}
            required
            className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
          />
        </div>
        <button
          type='submit'
          disabled={isLoading}
          className='w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300'
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        {error && (
          <p className='text-red-500 text-sm mt-4 text-center'>Login failed</p>
        )}
      </form>
    </div>
  );
};
