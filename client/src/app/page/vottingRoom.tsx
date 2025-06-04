// // import { useEffect, useState } from 'react';
// // import {
// //   useGetVotingRoomsQuery,
// //   type IVotingRoom,
// // } from '../../api/get-voting-room';
// // import { useGetParticipantsQuery } from '../../api/get-participants';

import { useGetVotingRoomsQuery } from '../../api/get-voting-room';

// // export const VotingRoom = ({ roomId: roomCode }: { roomId: string }) => {
// //   const { data: rooms, isLoading, error } = useGetVotingRoomsQuery({});
// //   console.log('rooms', rooms);
// //   const { data } = useGetParticipantsQuery({
// //     roomId: roomCode,
// //     email: '',
// //     name: '',
// //     userId: '',
// //     joinedAt: '',
// //   });
// //   console.log('participants', data);
// //   console.log('roomId', roomCode);

// //   if (isLoading) return <div className='text-center p-4'>Loading...</div>;
// //   if (error)
// //     return (
// //       <div className='text-center p-4 text-red-500'>Failed to load rooms.</div>
// //     );

// //   return (
// //     <div className='grid grid-cols-1 md:grid-cols-2 gap-6 p-4'>
// //       {rooms?.map((room) => <VotingRoomCard key={room._id} room={room} />)}
// //     </div>
// //   );
// // };

// // const VotingRoomCard = ({ room }: { room: IVotingRoom }) => {
// //   // Calculate endTime from startTime + duration (in case endTime isn't reliable)
// //   const calculateEndTime = () => {
// //     const start = new Date(room.startTime).getTime();
// //     const durationMs =
// //       (room.duration.days || 0) * 24 * 60 * 60 * 1000 +
// //       (room.duration.hours || 0) * 60 * 60 * 1000 +
// //       (room.duration.minutes || 0) * 60 * 1000;

// //     return start + durationMs;
// //   };

// //   const [remainingTime, setRemainingTime] = useState<number>(() => {
// //     const end = calculateEndTime();
// //     return Math.max(end - Date.now(), 0);
// //   });

// //   const [isVotingStopped, setIsVotingStopped] = useState<boolean>(
// //     !room.isVotingOpen,
// //   );

// //   useEffect(() => {
// //     if (isVotingStopped) return;

// //     const interval = setInterval(() => {
// //       const now = Date.now();
// //       const end = calculateEndTime();
// //       const timeLeft = end - now;

// //       if (timeLeft <= 0) {
// //         clearInterval(interval);
// //         setRemainingTime(0);
// //         setIsVotingStopped(true);
// //       } else {
// //         setRemainingTime(timeLeft);
// //       }
// //     }, 1000);

// //     return () => clearInterval(interval);
// //   }, [room, isVotingStopped]);

// //   const formatTime = (ms: number) => {
// //     const seconds = Math.floor((ms / 1000) % 60);
// //     const minutes = Math.floor((ms / 1000 / 60) % 60);
// //     const hours = Math.floor(ms / 1000 / 60 / 60);
// //     return `${hours.toString().padStart(2, '0')}h : ${minutes
// //       .toString()
// //       .padStart(2, '0')}m : ${seconds.toString().padStart(2, '0')}s`;
// //   };
// //   const handleStopVoting = () => {
// //     setIsVotingStopped(true);
// //     // You may also trigger a backend call here to mark voting as stopped.
// //   };

// //   return (
// //     <div className='bg-white rounded-2xl shadow-md p-6 border border-gray-200'>
// //       <h2 className='text-xl font-bold mb-3'>{room.title}</h2>
// //       {/* {data?.participants?.map((participant, index) => (
// //         <p key={index}>Name: {participant.name}</p>
// //       ))} */}
// //       <ul className='space-y-2 mb-4'>
// //         {room.options.map((opt, idx) => (
// //           <li
// //             key={idx}
// //             className='flex justify-between items-center bg-gray-100 px-4 py-2 rounded-lg'
// //           >
// //             <span>{opt.text}</span>
// //             <span className='font-semibold'>{opt.voteCount} votes</span>
// //           </li>
// //         ))}
// //       </ul>

// //       <div className='mb-4 text-gray-700'>
// //         <p>
// //           ⏱ Remaining Time:{' '}
// //           <span className='font-semibold'>{formatTime(remainingTime)}</span>
// //         </p>
// //       </div>

// //       <button
// //         onClick={handleStopVoting}
// //         disabled={isVotingStopped}
// //         className={`px-4 py-2 rounded-md text-white ${
// //           isVotingStopped
// //             ? 'bg-gray-400 cursor-not-allowed'
// //             : 'bg-red-600 hover:bg-red-700'
// //         }`}
// //       >
// //         {isVotingStopped ? 'Voting Closed' : 'Stop Voting'}
// //       </button>
// //     </div>
// //   );
// // };
// import { useEffect, useState } from 'react';
// import {
//   useGetVotingRoomsQuery,
//   type IVotingRoom,
// } from '../../api/get-voting-room';
// import {
//   useGetParticipantsQuery,
//   type GetParticipantsParams,
// } from '../../api/get-participants';
// import { useVoteOnOptionMutation } from '../../api/vote_on_option';

// export const VotingRoom = ({ roomId: roomCode }: { roomId: string }) => {
//   const { data: rooms, isLoading, error } = useGetVotingRoomsQuery({});
//   console.log('rooms', rooms);
//   const { data } = useGetParticipantsQuery({
//     roomId: roomCode,
//     email: '',
//     name: '',
//     userId: '',
//     joinedAt: '',
//   });
//   const [voteOnOption] = useVoteOnOptionMutation();
//   console.log('participants', data);
//   // console.log('roomId', roomCode);
//   // console.log('voting room data', rooms);

//   if (isLoading)
//     return (
//       <div className='flex items-center justify-center p-8'>
//         <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
//         <span className='ml-3 text-lg text-gray-600'>
//           Loading voting rooms...
//         </span>
//       </div>
//     );

//   if (error)
//     return (
//       <div className='text-center p-8'>
//         <div className='bg-red-50 border border-red-200 rounded-xl p-6 max-w-md mx-auto'>
//           <div className='text-red-600 text-xl mb-2'>⚠️</div>
//           <h3 className='text-red-800 font-semibold mb-2'>
//             Failed to load rooms
//           </h3>
//           <p className='text-red-600'>
//             Please try refreshing the page or contact support.
//           </p>
//         </div>
//       </div>
//     );

//   return (
//     <div className='min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6'>
//       <div className='max-w-7xl mx-auto'>
//         <div className='text-center mb-8'>
//           <h1 className='text-4xl font-bold text-gray-800 mb-2'>
//             Live Voting Rooms
//           </h1>
//           <p className='text-gray-600'>
//             Cast your vote and see real-time results
//           </p>
//         </div>

//         <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
//           {rooms?.map((room) => (
//             <VotingRoomCard
//               key={room._id}
//               voteOnOption={voteOnOption}
//               room={room}
//               participants={data}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
// // const getUserVotedOption = (options, userId) => {
// //   for (const option of options) {
// //     if (option.votes.some((vote) => vote.userId === userId)) {
// //       return option._id;
// //     }
// //   }
// //   return null;
// // };

// const VotingRoomCard = ({
//   room,
//   participants,
//   voteOnOption,
// }: {
//   room: IVotingRoom;
//   participants: GetParticipantsParams;
//   voteOnOption: (params: { voteId: string; optionId: string }) => Promise<any>;
// }) => {
//   const getTotalDurationMs = () => {
//     return (
//       (room.duration.days || 0) * 24 * 60 * 60 * 1000 +
//       (room.duration.hours || 0) * 60 * 60 * 1000 +
//       (room.duration.minutes || 0) * 60 * 1000
//     );
//   };

//   // Find which option user voted for, if any
//   // const selectedOption = getUserVotedOption(room.options, room.creator._id);
//   // const userId = room.creator._id; // Assuming the creator is the current user for this example

//   const [remainingTime, setRemainingTime] = useState(() =>
//     getTotalDurationMs(),
//   );
//   const [isVotingStopped, setIsVotingStopped] = useState(!room.isVotingOpen);
//   // const [selectedOption, setSelectedOption] = useState<string | null>(null);
//   // const [hasVoted, setHasVoted] = useState(false);
//   const voteId = room._id;
//   const handleVote = async (optionId) => {
//     try {
//       const result = await voteOnOption({ voteId, optionId }).unwrap();
//       console.log('Vote success:', result);
//     } catch (err) {
//       console.error('Vote error:', err);
//     }
//   };

//   useEffect(() => {
//     // Reset timer when room changes
//     setRemainingTime(getTotalDurationMs());
//   }, [room._id, room.duration]);

//   useEffect(() => {
//     if (isVotingStopped || remainingTime <= 0) return;

//     const interval = setInterval(() => {
//       setRemainingTime((prevTime) => {
//         const newTime = prevTime - 1000; // Decrease by 1 second

//         if (newTime <= 0) {
//           clearInterval(interval);
//           setIsVotingStopped(true);
//           return 0;
//         }

//         return newTime;
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [isVotingStopped, remainingTime]);

//   const formatTime = (ms: number) => {
//     const totalSeconds = Math.floor(ms / 1000);
//     const hours = Math.floor(totalSeconds / 3600);
//     const minutes = Math.floor((totalSeconds % 3600) / 60);
//     const seconds = totalSeconds % 60;

//     if (hours > 0) {
//       return `${hours}h ${minutes}m ${seconds}s`;
//     } else if (minutes > 0) {
//       return `${minutes}m ${seconds}s`;
//     } else {
//       return `${seconds}s`;
//     }
//   };

//   const handleStopVoting = () => {
//     setIsVotingStopped(true);
//     // You may also trigger a backend call here to mark voting as stopped.
//   };

//   const totalVotes = room.options.reduce(
//     (sum, option) => sum + option.voteCount,
//     0,
//   );
//   const participantCount = participants?.participants?.length || 0;

//   const getTimerColor = () => {
//     if (remainingTime > 60000) return 'text-green-600'; // > 1 minute
//     if (remainingTime > 30000) return 'text-yellow-600'; // > 30 seconds
//     return 'text-red-600'; // <= 30 seconds
//   };

//   const getDurationInMs = () => {
//     return (
//       (room.duration.days || 0) * 24 * 60 * 60 * 1000 +
//       (room.duration.hours || 0) * 60 * 60 * 1000 +
//       (room.duration.minutes || 0) * 60 * 1000
//     );
//   };

//   const totalDuration = getDurationInMs();

//   return (
//     <div className='bg-white rounded-3xl shadow-xl p-8 border border-gray-100 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl'>
//       {/* Header */}
//       <div className='mb-6'>
//         <div className='flex items-center justify-between mb-4'>
//           <h2 className='text-2xl font-bold text-gray-800 leading-tight'>
//             {room.title}
//           </h2>
//           <div
//             className={`px-3 py-1 rounded-full text-sm font-medium ${
//               isVotingStopped
//                 ? 'bg-gray-100 text-gray-600'
//                 : 'bg-green-100 text-green-700'
//             }`}
//           >
//             {isVotingStopped ? '🔒 Closed' : '🟢 Live'}
//           </div>
//         </div>

//         <div className='flex items-center text-sm text-gray-500 mb-2'>
//           <span>👤 Created by {room.creator.username}</span>
//           <span className='mx-2'>•</span>
//           <span>📊 {totalVotes} total votes</span>
//         </div>

//         <div className='flex items-center text-sm text-gray-500'>
//           <span>👥 {participantCount} participants</span>
//         </div>
//       </div>

//       {/* Timer */}
//       {/* Timer */}
//       <div
//         className={`mb-6 p-4 rounded-2xl bg-gray-50 border-2 ${
//           remainingTime <= 30000 && remainingTime > 0
//             ? 'border-red-200 bg-red-50 animate-pulse'
//             : 'border-gray-200'
//         }`}
//       >
//         <div className='flex items-center justify-between'>
//           <span className='text-gray-700 font-medium'>⏱️ Time Remaining:</span>
//           <span className={`text-2xl font-bold ${getTimerColor()}`}>
//             {remainingTime > 0 ? formatTime(remainingTime) : "Time's Up!"}
//           </span>
//         </div>
//         {remainingTime > 0 && (
//           <div className='mt-2 w-full bg-gray-200 rounded-full h-2'>
//             <div
//               className={`h-2 rounded-full transition-all duration-1000 ${
//                 remainingTime <= 30000
//                   ? 'bg-red-500'
//                   : remainingTime <= 60000
//                     ? 'bg-yellow-500'
//                     : 'bg-green-500'
//               }`}
//               style={{
//                 width: `${Math.max((remainingTime / totalDuration) * 100, 0)}%`,
//               }}
//             ></div>
//           </div>
//         )}
//       </div>
//       {/* Voting Options */}
//       <div className='space-y-3 mb-6'>
//         {room.options.map((option, idx) => {
//           return (
//             <button
//               // key={option._id}
//               key={idx}
//               // className={`relative overflow-hidden rounded-xl border-2 transition-all duration-300 cursor-pointer ${
//               //   isSelected
//               //     ? 'border-blue-500 bg-blue-50 transform scale-102'
//               //     : hasVoted || isVotingStopped
//               //       ? 'border-gray-200 bg-gray-50 cursor-not-allowed'
//               //       : 'border-gray-200 bg-gray-50 hover:border-blue-300 hover:bg-blue-25'
//               // }`}
//               onClick={() => {
//                 {
//                   handleVote(option._id);
//                 }
//               }}
//             >
//               {/* Progress Bar Background */}
//               {/* {totalVotes > 0 && (
//                 <div
//                   className={`absolute inset-0 transition-all duration-1000 ${
//                     isSelected ? 'bg-blue-200' : 'bg-blue-100'
//                   }`}
//                   style={{ width: `${percentage}%` }}
//                 ></div>
//               )} */}

//               {/* Content */}
//               <div className='relative flex justify-between items-center p-4'>
//                 <div className='flex items-center'>
//                   <span
//                   // className={`font-medium ${isSelected ? 'text-blue-800' : 'text-gray-800'}`}
//                   >
//                     {option.text}
//                   </span>
//                 </div>
//                 <div className='flex items-center space-x-3'>
//                   {/* {totalVotes > 0 && (
//                     <span className='text-sm text-gray-600'>
//                       {percentage.toFixed(1)}%
//                     </span>
//                   )} */}
//                   <span
//                   // className={`font-bold px-3 py-1 rounded-full text-sm ${
//                   //   isSelected
//                   //     ? 'bg-blue-600 text-white'
//                   //     : option.voteCount > 0
//                   //       ? 'bg-gray-700 text-white'
//                   //       : 'bg-gray-300 text-gray-600'
//                   // }`}
//                   >
//                     {option.voteCount}
//                   </span>
//                 </div>
//               </div>
//             </button>
//           );
//         })}
//       </div>

//       {/* Participants List */}
//       {participants?.participants && participants.participants.length > 0 && (
//         <div className='mb-6 p-4 bg-gray-50 rounded-xl'>
//           <h3 className='text-sm font-semibold text-gray-700 mb-2'>
//             Recent Participants:
//           </h3>
//           <div className='space-y-1'>
//             {participants.participants
//               .slice(0, 3)
//               .map((participant: GetParticipantsParams, index: number) => (
//                 <div
//                   key={index}
//                   className='flex items-center text-sm text-gray-600'
//                 >
//                   <span className='w-2 h-2 bg-green-400 rounded-full mr-2'></span>
//                   <span className='font-medium'>{participant.name}</span>
//                   <span className='mx-2'>•</span>
//                   <span>
//                     {new Date(participant.joinedAt).toLocaleTimeString()}
//                   </span>
//                 </div>
//               ))}
//             {participants.participants.length > 3 && (
//               <div className='text-xs text-gray-500 mt-1'>
//                 +{participants.participants.length - 3} more participants
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Action Buttons */}
//       <div className='flex space-x-3'>
//         <button
//           onClick={handleStopVoting}
//           disabled={isVotingStopped}
//           className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
//             isVotingStopped
//               ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
//               : 'bg-red-600 hover:bg-red-700 text-white transform hover:scale-105 shadow-lg hover:shadow-xl'
//           }`}
//         >
//           {isVotingStopped ? '🔒 Voting Closed' : '⏹️ Stop Voting'}
//         </button>

//         {/* {hasVoted && (
//           <div className='flex items-center px-4 py-3 bg-green-100 text-green-700 rounded-xl font-medium'>
//             ✅ Vote Cast!
//           </div>
//         )} */}
//       </div>
//     </div>
//   );
// };
interface VoteRoomParams {
  roomId: string;
  voteId?: string;
}
export const VotingRoom = ({ roomId, voteId }: VoteRoomParams) => {
  const { data } = useGetVotingRoomsQuery({});
  console.log('voting room data', data);
  return (
    <div>
      {data?.map((room, index) => (
        <div key={index}>
          <p>{room._id}</p>
          <p>{room.title}</p>
          <p>{room.creator.username}</p>
          <p>{room.creator._id}</p>
          <p>
            Duration: {room.duration.days ?? 0}d {room.duration.hours ?? 0}h{' '}
            {room.duration.minutes ?? 0}m
          </p>
          <p>
            {room?.options?.map((option) => {
              return (
                <span key={option._id}>
                  {option.text}{' '}
                  {option.votes?.map((votevvalue) => {
                    return (
                      <span key={votevvalue.userId}>
                        {votevvalue.userId} {votevvalue._id}
                      </span>
                    );
                  })}
                  ({option.voteCount} votes)
                </span>
              );
            })}
          </p>
        </div>
      ))}
    </div>
  );
};
