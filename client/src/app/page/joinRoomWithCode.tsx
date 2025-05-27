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

      navigate({ to: '/roomsDetails' });
    } catch (err) {
      setError(
        typeof err === 'object' && err !== null && 'message' in err
          ? String((err as { message?: string }).message)
          : String(err),
      );
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
      <form
        onSubmit={handleJoin}
        className='bg-white p-6 rounded shadow-md w-full max-w-md space-y-4'
      >
        <h2 className='text-xl font-semibold text-center'>Join a Room</h2>

        <input
          type='text'
          placeholder='Enter Room Code'
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded'
        />

        {error && <p className='text-red-500 text-sm'>{error}</p>}

        <button
          type='submit'
          disabled={isLoading}
          className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition'
        >
          {isLoading ? 'Joining...' : 'Join Room'}
        </button>
      </form>
    </div>
  );
};
