import { useNavigate, useParams } from '@tanstack/react-router';
import { useState } from 'react';
import { useJoinWithCodeMutation } from '../../api/join-with-code';
import { useJoinWithLinkMutation } from '../../api/join-with-link';

export const JoinRoom = () => {
  const [inputValue, setInputValue] = useState('');
  const [joinWithCode, setJoinWithCode] = useState(true); // Toggle between code and link
  const [error, setError] = useState('');
  const navigate = useNavigate();
  // const roomCode=useParams()
  const { roomCode } = useParams({ strict: false }) as { roomCode?: string };

  const [triggerJoinWithCode, { isLoading: loadingCode }] =
    useJoinWithCodeMutation();
  const [triggerJoinWithLink, { isLoading: loadingLink }] =
    useJoinWithLinkMutation();

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const roomCode = joinWithCode ? inputValue : inputValue.split('/').pop(); // extract room code from link

    if (!roomCode) {
      setError('Room code or link is invalid');
      return;
    }

    try {
      if (joinWithCode) {
        await triggerJoinWithCode({ roomCode }).unwrap();
      } else {
        await triggerJoinWithLink(roomCode).unwrap();
      }
      navigate({ to: `/joinRoom/${roomCode}` });
    } catch (err) {
      setError(
        typeof err === 'object' && err !== null && 'message' in err
          ? String((err as { message?: unknown }).message)
          : String(err),
      );
    }
  };

  return (
    <div className='min-h-screen flex justify-center items-center bg-gray-100 px-4'>
      <form
        onSubmit={handleJoin}
        className='bg-white p-6 rounded shadow-md w-full max-w-md space-y-4'
      >
        <h2 className='text-2xl font-semibold text-center'>
          {joinWithCode ? 'Join with Room Code' : 'Join with Invite Link'}
        </h2>

        <input
          type='text'
          placeholder={joinWithCode ? 'Enter Room Code' : 'Paste Invite Link'}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded'
        />

        {error && <p className='text-red-500 text-sm'>{error}</p>}

        <button
          type='submit'
          disabled={loadingCode || loadingLink}
          className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition'
        >
          {loadingCode || loadingLink
            ? 'Joining...'
            : joinWithCode
              ? 'Join with Code'
              : 'Join with Link'}
        </button>

        <button
          type='button'
          onClick={() => setJoinWithCode(!joinWithCode)}
          className='w-full text-blue-600 underline text-sm mt-2'
        >
          Switch to {joinWithCode ? 'Join with Link' : 'Join with Code'}
        </button>
      </form>
    </div>
  );
};
