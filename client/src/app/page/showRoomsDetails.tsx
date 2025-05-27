import { useGetAllRoomsQuery } from '../../api/get-room-details';

export const ShowRoomsDetails = () => {
  const { data: rooms, isLoading, error } = useGetAllRoomsQuery();

  if (isLoading)
    return <p className='text-center text-gray-600'>Loading rooms...</p>;
  if (error)
    return <p className='text-center text-red-600'>Error loading rooms</p>;

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <h1 className='text-2xl font-bold text-center mb-6'>All Rooms</h1>
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {rooms?.map((room) => (
          <div key={room._id} className='bg-white rounded shadow-md p-4 border'>
            <h2 className='text-lg font-semibold mb-2'>{room.title}</h2>
            <p className='text-gray-700 mb-1'>{room.description}</p>
            <p className='text-sm text-gray-500 mb-1'>Code: {room.roomCode}</p>
            <p className='text-sm text-gray-500 mb-1'>
              Max Participants: {room.maxParticipants}
            </p>
            <p className='text-sm text-gray-500 mb-1'>
              Created by: {room.creatorId?.username} ({room.creatorId?.email})
            </p>
            <p className='text-sm text-gray-500 mb-1'>
              Room code :{room.roomCode}
            </p>
            <p>Room Link : {room.inviteLink}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
