import { useNavigate } from '@tanstack/react-router';
import { useGetAllRoomsQuery } from '../../api/get-room-details';

export const ShowRoomsDetails = () => {
  const { data: rooms, isLoading, error } = useGetAllRoomsQuery();
  console.log('Rooms data:', rooms);

  const navigate = useNavigate();

  if (isLoading)
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center'>
        <div className='flex flex-col items-center'>
          <div className='animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent'></div>
          <p className='text-center text-gray-600 mt-4 text-lg'>
            Loading rooms...
          </p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className='min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center'>
        <div className='bg-white rounded-lg shadow-lg p-8 border-l-4 border-red-500'>
          <p className='text-center text-red-600 text-lg font-medium'>
            Error loading rooms
          </p>
        </div>
      </div>
    );

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-4xl font-bold text-center mb-8 text-gray-800 bg-clip-text  bg-gradient-to-r from-blue-600 to-purple-600'>
          All Rooms
        </h1>
        <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {rooms?.map((room) => (
            <div
              key={room._id}
              className='group bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-200 hover:border-blue-300 overflow-hidden'
            >
              {/* Card Header */}
              <div className='bg-gradient-to-r from-blue-500 to-purple-600 p-4'>
                <h2 className='text-xl font-bold text-white mb-2 group-hover:scale-105 transition-transform duration-200'>
                  {room.title}
                </h2>
                <div className='bg-white bg-opacity-20 rounded-lg px-3 py-1 inline-block'>
                  <span className='text-blue-500 text-sm font-medium'>
                    Code: {room.roomCode}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className='p-6'>
                <p className='text-gray-700 mb-4 text-sm leading-relaxed'>
                  {room.description}
                </p>

                {/* Room Details */}
                <div className='space-y-3 mb-6'>
                  <div className='flex items-center justify-between bg-gray-50 rounded-lg p-3'>
                    <span className='text-sm font-medium text-gray-600'>
                      Max Participants:
                    </span>
                    <span className='bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-semibold'>
                      {room.maxParticipants}
                    </span>
                  </div>

                  <div className='bg-gray-50 rounded-lg p-3'>
                    <div className='text-sm font-medium text-gray-600 mb-1'>
                      Created by:
                    </div>
                    <div className='text-sm text-gray-800 font-medium'>
                      {room.creator?.username}
                    </div>
                    <div className='text-xs text-gray-500'>
                      {room.creator?.email}
                    </div>
                  </div>

                  <div className='bg-gray-50 rounded-lg p-3'>
                    <div className='text-sm font-medium text-gray-600 mb-2'>
                      Room Link:
                    </div>
                    <div className='text-xs text-blue-600 bg-blue-50 rounded p-2 break-all font-mono'>
                      {room.inviteLink}
                    </div>
                  </div>
                  <div className='bg-gray-50 rounded-lg p-3'>
                    <div className='text-sm font-medium text-gray-600 mb-2'>
                      Room Code:
                    </div>
                    <div className='text-xs text-blue-600 bg-blue-50 rounded p-2 break-all font-mono'>
                      {room.roomCode}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className='flex flex-col space-y-3'>
                  <button
                    onClick={() =>
                      navigate({
                        to: '/vottingRoom/$roomCode',
                        params: { roomCode: room.roomCode },
                      })
                    }
                    className='w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg'
                  >
                    🗳️ Start Voting
                  </button>
                  <button
                    onClick={() => {
                      navigate({ to: '/home' });
                    }}
                    className='w-full bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg'
                  >
                    🏠 Go Back
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
