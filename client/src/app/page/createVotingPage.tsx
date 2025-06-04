import React, { useState } from 'react';
import { useCreateVotingRoomMutation } from '../../api/create-voting-room';
import { useGetRoomByIdQuery } from '../../api/get-roomby-id';
import { useNavigate } from '@tanstack/react-router';

export const CreateVotingPage = ({ roomId }: { roomId: string }) => {
  console.log('CreateVotingPage rendered with roomId:', roomId);

  const [title, setTitle] = useState('');
  const [options, setOptions] = useState([{ text: '' }]);
  const [duration, setDuration] = useState({ minutes: 0, hours: 0, days: 0 });
  const navigate = useNavigate();
  const [createVotingRoom] = useCreateVotingRoomMutation();
  const { data } = useGetRoomByIdQuery({ roomId });
  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...options];
    updatedOptions[index].text = value;
    setOptions(updatedOptions);
  };
  console.log('data', data);

  const handleAddOption = () => {
    setOptions([...options, { text: '' }]);
  };

  const handleRemoveOption = (index: number) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newRoom = {
      title,
      options,
      duration,
    };
    try {
      await createVotingRoom(newRoom).unwrap();
      alert('Voting room created successfully!');
      setTitle('');
      setOptions([{ text: '' }]);
      setDuration({ minutes: 0, hours: 0, days: 0 });
      navigate({ to: `/vottingRoom/${roomId}` });
    } catch (error) {
      alert('Error creating room');
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='max-w-xl mx-auto p-4 bg-white shadow-md rounded-xl space-y-4'
    >
      <h2 className='text-xl font-semibold'>Create Voting Room</h2>

      <p>Title :{data?.title || 'Loading...'}</p>
      <p>Room Code:{data?.roomCode}</p>
      <p>creator name : {data?.creatorId.username}</p>

      <div>
        <label className='block mb-1 font-medium'>Title</label>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='w-full border rounded px-3 py-2'
          required
        />
      </div>

      <div>
        <label className='block mb-1 font-medium'>Options</label>
        {options.map((option, index) => (
          <div key={index} className='flex items-center gap-2 mb-2'>
            <input
              type='text'
              value={option.text}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className='flex-1 border rounded px-3 py-2'
              required
            />
            {options.length > 1 && (
              <button
                type='button'
                onClick={() => handleRemoveOption(index)}
                className='text-red-500 hover:text-red-700 text-xl'
              >
                &times;
              </button>
            )}
          </div>
        ))}
        <button
          type='button'
          onClick={handleAddOption}
          className='text-blue-500 hover:underline text-sm'
        >
          + Add more option
        </button>
      </div>

      <div>
        <label className='block mb-1 font-medium'>Duration</label>
        <div className='grid grid-cols-3 gap-2'>
          <input
            type='number'
            placeholder='Days'
            value={duration.days}
            onChange={(e) =>
              setDuration({
                ...duration,
                days: parseInt(e.target.value || '0'),
              })
            }
            className='border rounded px-3 py-2'
          />
          <input
            type='number'
            placeholder='Hours'
            value={duration.hours}
            onChange={(e) =>
              setDuration({
                ...duration,
                hours: parseInt(e.target.value || '0'),
              })
            }
            className='border rounded px-3 py-2'
          />
          <input
            type='number'
            placeholder='Minutes'
            value={duration.minutes}
            onChange={(e) =>
              setDuration({
                ...duration,
                minutes: parseInt(e.target.value || '0'),
              })
            }
            className='border rounded px-3 py-2'
          />
        </div>
      </div>

      <button
        type='submit'
        className='w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700'
      >
        Create Room
      </button>
    </form>
  );
};
