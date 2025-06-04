// import { useState, useEffect } from 'react';
// // import { useGetRoomByIdQuery } from '../../api/get-roomby-id';
// import { useGetParticipantsQuery } from '../../api/get-participants';
// // import { useCreateVotingRoomMutation } from '../../api/create-voting-room';

// export const Room = ({ roomId }: { roomId: string }) => {
//   const [gameState, setGameState] = useState('setup'); // setup, voting, results, tie
//   const [votingForm, setVotingForm] = useState({
//     title: '',
//     options: [''],
//     duration: 5,
//   });
//   const [duration, setDuration] = useState(5);
//   const [timeLeft, setTimeLeft] = useState(0);
//   const [votes, setVotes] = useState({});

//   const [selectedOption, setSelectedOption] = useState(null);
//   const [showToast, setShowToast] = useState('');
//   const [spinnerRotation, setSpinnerRotation] = useState(0);
//   const [isSpinning, setIsSpinning] = useState(false);
//   const [tieOptions, setTieOptions] = useState([]);
//   const [finalResult, setFinalResult] = useState(null);
//   // const { data } = useGetRoomByIdQuery({ roomId });
//   const { data: participantsData } = useGetParticipantsQuery({
//     roomId,
//     email: '',
//     name: '',
//     userId: '',
//     joinedAt: '',
//   });
//   // const [data:createVotingRoom]= useCreateVotingRoomMutation()
//   // console.log('Room Data:', data?.roomCode);
//   // console.log('Participants data', participantsData);

//   // Timer effect
//   useEffect(() => {
//     if (gameState === 'voting' && timeLeft > 0) {
//       const timer = setInterval(() => {
//         setTimeLeft((prev) => {
//           if (prev <= 1) {
//             setGameState('results');
//             showToastMessage('⏰ Voting time is up!');
//             calculateResults();
//             return 0;
//           }
//           return prev - 1;
//         });
//       }, 1000);
//       return () => clearInterval(timer);
//     }
//   }, [gameState, timeLeft]);

//   // Mock real-time voting updates
//   useEffect(() => {
//     if (gameState === 'voting') {
//       const interval = setInterval(() => {
//         // Simulate random participants voting
//         // setParticipants((prev) =>
//         //   prev.map((p) => ({
//         //     ...p,
//         //     voted: Math.random() > 0.7 ? true : p.voted,
//         //   })),
//         // );

//         // Simulate vote counts
//         const validOptions = options.filter((opt) => opt.trim());
//         const newVotes = {};
//         validOptions.forEach((option) => {
//           newVotes[option] = Math.floor(Math.random() * 4);
//         });
//         setVotes(newVotes);
//       }, 3000);

//       return () => clearInterval(interval);
//     }
//   }, [gameState, options]);

//   const showToastMessage = (message) => {
//     setShowToast(message);
//     setTimeout(() => setShowToast(''), 3000);
//   };

//   const addOption = () => {
//     setOptions([...options, '']);
//   };

//   const removeOption = (index) => {
//     if (options.length > 1) {
//       setOptions(options.filter((_, i) => i !== index));
//     }
//   };

//   const updateOption = (index, value) => {
//     const newOptions = [...options];
//     newOptions[index] = value;
//     setOptions(newOptions);
//   };

//   const createDecision = () => {
//     if (!title.trim() || options.filter((opt) => opt.trim()).length < 2) {
//       showToastMessage('⚠️ Please add a title and at least 2 options!');
//       return;
//     }

//     setGameState('voting');
//     setTimeLeft(duration * 60);
//     const validOptions = options.filter((opt) => opt.trim());
//     const initialVotes = {};
//     validOptions.forEach((option) => {
//       initialVotes[option] = 0;
//     });
//     setVotes(initialVotes);
//     showToastMessage('🎮 Decision game started!');
//   };

//   const vote = (option) => {
//     if (selectedOption === option) return;

//     setSelectedOption(option);
//     setVotes((prev) => ({
//       ...prev,
//       [option]: (prev[option] || 0) + 1,
//     }));
//     showToastMessage('✅ Vote recorded!');
//   };

//   const calculateResults = () => {
//     const validOptions = options.filter((opt) => opt.trim());
//     const maxVotes = Math.max(...Object.values(votes));
//     const winners = validOptions.filter((option) => votes[option] === maxVotes);

//     if (winners.length > 1) {
//       setTieOptions(winners);
//       setGameState('tie');
//       showToastMessage("🤝 It's a tie! Spin to decide!");
//     } else {
//       setFinalResult(winners[0]);
//       showToastMessage(`🎉 Winner: ${winners[0]}!`);
//     }
//   };

//   const spinForWinner = () => {
//     setIsSpinning(true);
//     const spins = 5 + Math.random() * 5;
//     const finalRotation = spins * 360 + Math.random() * 360;

//     setSpinnerRotation(finalRotation);

//     setTimeout(() => {
//       const winnerIndex = Math.floor(Math.random() * tieOptions.length);
//       setFinalResult(tieOptions[winnerIndex]);
//       setIsSpinning(false);
//       setGameState('results');
//       showToastMessage(`🎯 Spinner chose: ${tieOptions[winnerIndex]}!`);
//     }, 3000);
//   };

//   const resetGame = () => {
//     setGameState('setup');

//     setDuration(5);
//     setTimeLeft(0);
//     setVotes({});
//     setSelectedOption(null);
//     setTieOptions([]);
//     setFinalResult(null);
//     setSpinnerRotation(0);
//   };

//   const formatTime = (seconds: number) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   return (
//     <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6'>
//       {/* Toast Notification */}
//       {showToast && (
//         <div className='fixed top-4 right-4 z-50 bg-white bg-opacity-20 backdrop-blur-lg border border-white border-opacity-30 rounded-xl px-6 py-3 text-white font-medium animate-bounce'>
//           {showToast}
//         </div>
//       )}

//       <div className='max-w-4xl mx-auto'>
//         {/* Header */}
//         <div className='text-center mb-8'>
//           <h1 className='text-4xl md:text-5xl font-bold text-white mb-2'>
//             <span className='bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent'>
//               🎲 Decision Maker
//             </span>
//           </h1>
//           <p className='text-blue-200 text-lg'>
//             Create fun group decisions with voting and tie-breakers!
//           </p>
//           <p>Title :{data?.title || 'Loading...'}</p>
//           <p>Room Code:{data?.roomCode}</p>
//         </div>

//         {/* Setup Phase */}
//         {gameState === 'setup' && (
//           <div className='bg-white bg-opacity-10 backdrop-blur-xl rounded-3xl p-8 border border-white border-opacity-20 shadow-2xl'>
//             <h2 className='text-2xl font-bold text-blue-600 mb-6'>
//               🎯 Create New Decision
//             </h2>

//             {/* Title Input */}
//             <div className='mb-6'>
//               <label className='block text-blue-400 font-medium mb-2'>
//                 Decision Title
//               </label>
//               <input
//                 type='text'
//                 name='title'
//                 value={votingForm.title}
//                 placeholder='e.g., Where should we go for dinner?'
//                 className='w-full px-4 py-3 bg-white bg-opacity-10 border border-pink-400 border-opacity-30 rounded-xl text-blue-400 placeholder-white placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300'
//               />
//             </div>

//             {/* Duration Selector */}
//             <div className='mb-6'>
//               <label className='block text-blue-400 font-medium mb-2'>
//                 Voting Duration (minutes)
//               </label>
//               <div className='flex space-x-2'>
//                 {[1, 3, 5, 10, 15, 20, 30].map((min) => (
//                   <button
//                     key={min}
//                     onClick={() => setDuration(min)}
//                     className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
//                       duration === min
//                         ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
//                         : 'bg-white bg-opacity-10 text-blue-400 hover:bg-opacity-20'
//                     }`}
//                   >
//                     {min}m
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Options */}
//             <div className='mb-8'>
//               <label className='block text-blue-600 font-medium mb-4'>
//                 Options to Vote On
//               </label>
//               <div className='space-y-3'>
//                 {votingForm.options.map((option, index) => (
//                   <div key={index} className='flex space-x-2'>
//                     <input
//                       type='text'
//                       name={`option-${index}`}
//                       value={votingForm.options[index] || ''}
//                       onChange={}
//                       placeholder={`Option ${index + 1}`}
//                       className='flex-1 px-4 py-3 bg-white bg-opacity-10 border border-pink-400 border-opacity-30 rounded-xl text-blue-400 placeholder-white placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300'
//                     />
//                     {votingForm.options.length > 1 && (
//                       <button
//                         onClick={() => removeOption(index)}
//                         className='px-3 py-2 bg-red-500 bg-opacity-20 hover:bg-opacity-30 text-red-300 rounded-lg transition-all duration-300'
//                       >
//                         ❌
//                       </button>
//                     )}
//                   </div>
//                 ))}
//               </div>

//               <button
//                 onClick={addOption}
//                 className='mt-4 px-6 py-2 bg-green-500 bg-opacity-20 hover:bg-opacity-30 text-pink-700 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2'
//               >
//                 <span>➕</span>
//                 <span>Add Option</span>
//               </button>
//             </div>

//             {/* Create Button */}
//             <button
//               onClick={createDecision}
//               className='w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-4 rounded-xl hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl text-lg'
//             >
//               🚀 Create Decision Game
//             </button>
//           </div>
//         )}

//         {/* Voting Phase */}
//         {gameState === 'voting' && (
//           <div className='space-y-6'>
//             {/* Timer & Status */}
//             <div className='bg-white bg-opacity-10 backdrop-blur-xl rounded-2xl p-6 border border-pink-400 border-opacity-20 text-center'>
//               <h2 className='text-2xl font-bold text-pink-800 mb-2'>{title}</h2>
//               <div className='text-4xl font-bold text-yellow-300 mb-2'>
//                 {formatTime(timeLeft)}
//               </div>
//               <p className='text-blue-400'>Time remaining to vote</p>
//             </div>

//             {/* Voting Options */}
//             <div className='bg-white bg-opacity-10 backdrop-blur-xl rounded-2xl p-6 border border-pink-400 border-opacity-20'>
//               <h3 className='text-xl font-bold text-blue-600 mb-4'>
//                 Cast Your Vote
//               </h3>
//               <div className='grid gap-4'>
//                 {options
//                   .filter((opt) => opt.trim())
//                   .map((option, index) => (
//                     <button
//                       key={index}
//                       onClick={() => vote(option)}
//                       className={`p-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
//                         selectedOption === option
//                           ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-xl'
//                           : 'bg-white bg-opacity-10 text-blue-600 hover:bg-opacity-20'
//                       }`}
//                     >
//                       <div className='flex justify-between items-center'>
//                         <span>{option}</span>
//                         <div className='flex items-center space-x-2'>
//                           <span className='text-2xl'>{votes[option] || 0}</span>
//                           <span>👥</span>
//                         </div>
//                       </div>
//                     </button>
//                   ))}
//               </div>
//             </div>

//             {/* Participants */}
//             <div className='bg-white bg-opacity-10 backdrop-blur-xl rounded-2xl p-6 border border-white border-opacity-20'>
//               <h3 className='text-xl font-bold text-blue-600 mb-4'>
//                 Participants
//               </h3>
//               <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
//                 {/* {participantsData?.map((participant) => (
//                   <div
//                     key={participant.id}
//                     className={`p-3 rounded-lg text-center transition-all duration-300 ${
//                       participant.voted
//                         ? 'bg-green-500 bg-opacity-20 text-green-300'
//                         : 'bg-white bg-opacity-10 text-blue-600'
//                     }`}
//                   >
//                     <div className='text-2xl mb-1'>
//                       {participant.voted ? '✅' : '⏳'}
//                     </div>
//                     <div className='font-medium'>{participant.name}</div>
//                   </div>
//                 ))} */}
//                 {participantsData?.participants?.map((participant, index) => (
//                   <p key={index}>Name: {participant.name}</p>
//                 ))}
//               </div>
//             </div>

//             <button
//               onClick={() => {
//                 setGameState('results');
//                 calculateResults();
//               }}
//               className='w-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-3 rounded-xl hover:from-red-400 hover:to-pink-400 transition-all duration-300'
//             >
//               🛑 End Voting Early
//             </button>
//           </div>
//         )}

//         {/* Tie Breaker Spinner */}
//         {gameState === 'tie' && (
//           <div className='bg-white bg-opacity-10 backdrop-blur-xl rounded-3xl p-8 border border-white border-opacity-20 text-center'>
//             <h2 className='text-3xl font-bold text-white mb-4'>
//               🤝 It's a Tie!
//             </h2>
//             <p className='text-blue-200 mb-8'>
//               Spin the wheel to break the tie!
//             </p>

//             <div
//               className='relative mx-auto mb-8'
//               style={{ width: '300px', height: '300px' }}
//             >
//               <div
//                 className={`w-full h-full rounded-full border-8 border-pink-400 shadow-2xl transition-transform duration-3000 ease-out ${isSpinning ? 'animate-spin' : ''}`}
//                 style={{
//                   background: `conic-gradient(${tieOptions
//                     .map(
//                       (_, index) =>
//                         `from ${index * (360 / tieOptions.length)}deg to ${(index + 1) * (360 / tieOptions.length)}deg, ${
//                           [
//                             '#ff6b6b',
//                             '#4ecdc4',
//                             '#45b7d1',
//                             '#96ceb4',
//                             '#feca57',
//                             '#ff9ff3',
//                           ][index % 6]
//                         }`,
//                     )
//                     .join(', ')})`,
//                   transform: `rotate(${spinnerRotation}deg)`,
//                 }}
//               >
//                 {tieOptions.map((option, index) => (
//                   <div
//                     key={index}
//                     className='absolute text-white font-bold text-sm'
//                     style={{
//                       top: '50%',
//                       left: '50%',
//                       transform: `translate(-50%, -50%) rotate(${index * (360 / tieOptions.length) + 360 / tieOptions.length / 2}deg) translateY(-100px)`,
//                       transformOrigin: '50% 100px',
//                     }}
//                   >
//                     {option}
//                   </div>
//                 ))}
//               </div>

//               {/* Spinner Arrow */}
//               <div className='absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2'>
//                 <div className='w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-white'></div>
//               </div>
//             </div>

//             <button
//               onClick={spinForWinner}
//               disabled={isSpinning}
//               className='bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-8 rounded-xl hover:from-purple-400 hover:to-pink-400 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-xl'
//             >
//               {isSpinning ? '🌪️ Spinning...' : '🎯 Spin to Decide!'}
//             </button>
//           </div>
//         )}

//         {/* Results Phase */}
//         {gameState === 'results' && (
//           <div className='bg-white bg-opacity-10 backdrop-blur-xl rounded-3xl p-8 border border-white border-opacity-20 text-center'>
//             <h2 className='text-3xl font-bold text-white mb-6'>🎉 Results</h2>

//             {finalResult && (
//               <div className='mb-8'>
//                 <div className='text-5xl mb-4'>🏆</div>
//                 <h3 className='text-2xl font-bold text-yellow-300 mb-2'>
//                   Winner:
//                 </h3>
//                 <p className='text-3xl font-bold text-red-700  bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text '>
//                   {finalResult}
//                 </p>
//               </div>
//             )}

//             {/* Vote Breakdown */}
//             <div className='mb-8'>
//               <h4 className='text-xl font-bold text-white mb-4'>
//                 Vote Breakdown
//               </h4>
//               <div className='space-y-3'>
//                 {Object.entries(votes)
//                   .sort(([, a], [, b]) => b - a)
//                   .map(([option, count]) => (
//                     <div
//                       key={option}
//                       className='flex justify-between items-center bg-white bg-opacity-10 rounded-lg p-3'
//                     >
//                       <span className='text-white font-medium'>{option}</span>
//                       <span className='text-yellow-300 font-bold'>
//                         {count} votes
//                       </span>
//                     </div>
//                   ))}
//               </div>
//             </div>

//             <button
//               onClick={resetGame}
//               className='bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-8 rounded-xl hover:from-blue-400 hover:to-purple-400 transition-all duration-300 transform hover:scale-105'
//             >
//               🔄 Create New Decision
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
