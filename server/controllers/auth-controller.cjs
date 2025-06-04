const Room = require('../models/room.cjs');
const User = require('../models/user.cjs');
const { nanoid } = require('nanoid');
const mongoose = require('mongoose');
const Vote = require('../models/vote.cjs');

const home = async (req, res) => {
  try {
    res.status(200).send('welcome to backend server ');
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  try {
    // console.log(req.body);
    const { username, email, password, phone } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).send({ msg: 'Email already exist' });
    }
    // const saltRound = 10;
    // const hash_password = await bcrypt.hash(password, saltRound);

    const userCreated = await User.create({
      username,
      email,
      password,
      phone,
    });

    res.status(201).send({
      msg: 'User created successfully',
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (!userExist) {
    return res.status(400).json({ msg: 'Invalid credentials' });
  }

  // const user = await bcrypt.compare(password, userExist.password);
  const user = await userExist.comparePassword(password);

  if (user) {
    res.status(200).send({
      msg: 'Login successfully',
      token: await userExist.generateToken(),
      userId: userExist._id.toString(),
    });
  } else {
    res.status(401).json({ msg: 'Invalid email and password' });
  }
};

const createRoom = async (req, res) => {
  const { title, description, maxParticipants } = req.body;
  const { id, name, email } = req.user; // 👈 comes from authenticate middleware
  const roomCode = nanoid(8).toUpperCase();
  const inviteLink = `http://localhost:5173/room/${roomCode}`;

  try {
    const room = await Room.create({
      title,
      description,
      creator: {
        userId: id,
        name,
        email,
      },
      maxParticipants,
      roomCode,
      inviteLink,
    });

    const roomToken = await room.generateToken();

    res.status(201).json({
      msg: 'Room created successfully',
      token: roomToken,
      roomId: room._id.toString(),
    });
  } catch (err) {
    res.status(500).json({
      message: 'Room creation failed',
      error: err.message,
    });
  }
};

const getRoomDetails = async (req, res) => {
  try {
    const userId = req.user.id; // from authenticate middleware

    const rooms = await Room.find({ 'creator.userId': userId }).sort({
      createdAt: -1,
    });

    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch rooms',
      error: error.message,
    });
  }
};

// const joinRoom = async (req, res) => {
//   const userId = req.user?.id;
//   const { roomCode } = req.body;

//   if (!roomCode || !userId) {
//     return res.status(400).json({ error: 'Room code and login required' });
//   }

//   const room = await Room.findOne({ roomCode });
//   if (!room) return res.status(404).json({ error: 'Room not found' });
//   if (!room.isOpen) return res.status(403).json({ error: 'Room is closed' });

//   const alreadyJoined = room.participants.some(
//     (p) => p.userId?.toString() === userId,
//   );
//   if (alreadyJoined) {
//     return res.status(400).json({ error: 'User already joined' });
//   }

//   const user = await User.findById(userId).populate('userId', 'username email');
//   if (!user) return res.status(404).json({ error: 'User not found' });

//   room.participants.push({
//     name: user.name,
//     userId: user._id,
//   });

//   await room.save();

//   res.json({ message: 'Joined successfully', roomId: room._id });
// };
const joinRoom = async (req, res) => {
  const { id: userId, username, email } = req.user;

  const { roomCode } = req.body;

  if (!roomCode || !userId) {
    return res.status(400).json({ error: 'Room code and login required' });
  }

  const room = await Room.findOne({ roomCode });
  if (!room) return res.status(404).json({ error: 'Room not found' });
  if (!room.isOpen) return res.status(403).json({ error: 'Room is closed' });

  const alreadyJoined = room.participants.some(
    (p) => p.userId?.toString() === userId,
  );
  if (alreadyJoined) {
    return res.status(400).json({ error: 'User already joined' });
  }

  // ✅ Fetch user's name and email
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  // ✅ Add full info to participants
  // room.participants.push({
  //   name: user.name,
  //   email: user.email,
  //   userId: user._id,
  // });
  if (!alreadyJoined) {
    room.participants.push({
      userId,
      name: username,
      email,
    });

    await room.save();
  }
  res.json({
    message: 'Joined successfully',
    roomId: room._id,
    participant: {
      name: user.name,
      email: user.email,
      userId: user._id,
    },
  });
};

const joinRoomFromLink = async (req, res) => {
  const userId = req.user?.id; // from middleware
  const { roomCode } = req.params;

  if (!roomCode || !userId) {
    return res.status(400).json({ error: 'Room code and login required' });
  }

  const room = await Room.findOne({ roomCode });
  if (!room) return res.status(404).json({ error: 'Room not found' });
  if (!room.isOpen) return res.status(403).json({ error: 'Room is closed' });

  const alreadyJoined = room.participants.some(
    (p) => p.userId?.toString() === userId,
  );
  if (alreadyJoined) {
    return res.status(200).json({ message: 'Already joined', room });
  }

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  room.participants.push({
    name: user.name,
    userId: user._id,
  });

  await room.save();

  res.status(200).json({ message: 'Joined via link', room });
};

const participants = async (req, res) => {
  const { roomId } = req.params;
  console.log('Room ID from params:', roomId);

  if (!mongoose.Types.ObjectId.isValid(roomId)) {
    return res.status(400).json({ error: 'Invalid room ID format' });
  }

  try {
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    const participants = room.participants.map((p) => ({
      userId: p.userId,
      name: p.name,
      email: p.email,
      joinedAt: p.joinedAt,
    }));

    res.json({ participants });
  } catch (error) {
    console.error('Error fetching participants:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Example: server/controllers/auth-controller.js
const getRoomById = async (req, res) => {
  const { roomId } = req.params;
  // console.log('Room ID from params:', roomId);
  if (!mongoose.Types.ObjectId.isValid(roomId)) {
    return res.status(400).json({ error: 'Invalid room ID format' });
  }

  try {
    const room = await Room.findOne({ _id: roomId });
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.status(200).json(room);
  } catch (error) {
    console.error('Error fetching room:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// const getRoomById = async (req, res) => {
//   const { roomId } = req.params;

//   try {
//     const room = await Room.findById(roomId); // this includes roomCode too
//     if (!room) {
//       return res.status(404).json({ message: 'Room not found' });
//     }

//     console.log('Room details:', room); // should include roomCode
//     res.json(room);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };

const CreateVotingRoom = async (req, res) => {
  try {
    const { title, options, discussion, duration } = req.body;
    const creatorId = req.user.id;

    // const formattedOptions = options.map((opt) => ({
    //   text: opt,
    //   voteCount: 0,
    //   votes: [],
    // }));
    const formattedOptions = options.map((opt) => ({
      text: typeof opt === 'string' ? opt : opt.text,
      voteCount: 0,
      votes: [],
    }));

    // 🧠 Calculate endTime from duration
    const now = new Date();
    const totalMs =
      (duration.days || 0) * 24 * 60 * 60 * 1000 +
      (duration.hours || 0) * 60 * 60 * 1000 +
      (duration.minutes || 0) * 60 * 1000;
    const endTime = new Date(now.getTime() + totalMs);

    const room = new Vote({
      title,
      creator: req.user.id,
      options: formattedOptions,
      discussion,
      duration,
      startTime: now,
      endTime,
      creatorId,
    });

    await room.save();
    res.status(201).json(room);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getVotingRoom = async (req, res) => {
  try {
    const userId = req.user.id;

    const rooms = await Vote.find({
      creator: userId,
      isVotingOpen: true, // ✅ optional: only open rooms
    })
      .populate('creator', 'username email')
      .select('-__v');

    res.status(200).json(rooms);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while fetching rooms' });
  }
};
// const voteForOption = async (req, res) => {
//   const { roomId } = req.params;
//   const { userId, optionId } = req.body;

//   try {
//     const room = await Vote.findById(roomId);

//     if (!room) {
//       return res.status(404).json({ message: 'Voting room not found' });
//     }

//     if (!room.isVotingOpen) {
//       return res.status(400).json({ message: 'Voting is closed' });
//     }

//     // Check if user already voted in any option
//     const userAlreadyVoted = room.options.some((option) =>
//       option.votes.some((vote) => vote.userId.toString() === userId),
//     );

//     if (userAlreadyVoted) {
//       return res.status(400).json({ message: 'User has already voted' });
//     }

//     // Find the option by id
//     const option = room.options.id(optionId);
//     if (!option) {
//       return res.status(404).json({ message: 'Option not found' });
//     }

//     // Add user vote
//     option.votes.push({ userId: new mongoose.Types.ObjectId(userId) });
//     option.voteCount += 1;

//     await room.save();

//     res.status(200).json({ message: 'Vote registered successfully', room });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };
// const voteOnOption = async (req, res) => {
//   const { voteId, optionId } = req.params;
//   const userId = req.user._id; // assuming you're using middleware to get user

//   try {
//     const vote = await Vote.findById(voteId);

//     if (!vote) return res.status(404).json({ message: 'Poll not found' });

//     if (!vote.duration.isVotingOpen) {
//       return res.status(403).json({ message: 'Voting is closed' });
//     }

//     // Check if user already voted
//     if (vote.participants.includes(userId)) {
//       return res.status(400).json({ message: 'User has already voted' });
//     }

//     // Find the selected option
//     const option = Vote.options.id(optionId);

//     if (!option) {
//       return res.status(404).json({ message: 'Option not found' });
//     }

//     // Update vote count and add user's vote
//     option.voteCount += 1;
//     option.votes.push(userId);

//     // Add user to participants
//     vote.participants.push(userId);

//     await vote.save();

//     res.status(200).json({ message: 'Vote recorded successfully', poll: vote });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

const voteOnOption = async (req, res) => {
  // Add detailed logging
  console.log('=== VOTE API CALLED ===');
  console.log('Route params:', req.params);
  console.log('Request body:', req.body);
  console.log('User from auth:', req.user);
  console.log('Full request URL:', req.originalUrl);

  const { voteId, optionId } = req.params;
  const userId = req.user._id; // from authenticate middleware

  console.log('Extracted values:', { voteId, optionId, userId });

  try {
    // Find the vote document
    const vote = await Vote.findById(voteId);
    console.log('Found vote:', vote ? 'Yes' : 'No');

    if (!vote) {
      console.log('Vote not found with ID:', voteId);
      return res.status(404).json({ message: 'Poll not found' });
    }

    console.log('Vote isVotingOpen:', vote.isVotingOpen);
    console.log('Vote participants:', vote.participants);
    console.log('Current userId:', userId);

    // Check if voting is open
    if (!vote.isVotingOpen) {
      console.log('Voting is closed');
      return res.status(403).json({ message: 'Voting is closed' });
    }

    // Check if user already voted
    const hasVoted = vote.participants.includes(userId);
    console.log('User has already voted:', hasVoted);

    if (hasVoted) {
      return res.status(400).json({ message: 'User has already voted' });
    }

    // Find the selected option
    console.log('Looking for option with ID:', optionId);
    const option = vote.options.id(optionId);
    console.log('Found option:', option ? 'Yes' : 'No');

    if (!option) {
      console.log(
        'Available options:',
        vote.options.map((opt) => ({
          id: opt._id.toString(),
          text: opt.text,
        })),
      );
      return res.status(404).json({ message: 'Option not found' });
    }

    console.log('Before update - Option vote count:', option.voteCount);
    console.log('Before update - Option votes array:', option.votes);

    // Update vote count and add user's vote
    option.voteCount += 1;
    option.votes.push(userId);

    // Add user to participants
    vote.participants.push(userId);

    console.log('After update - Option vote count:', option.voteCount);
    console.log('After update - Option votes array:', option.votes);
    console.log('After update - Vote participants:', vote.participants);

    // Save the changes
    const savedVote = await vote.save();
    console.log('Vote saved successfully');

    res.status(200).json({
      message: 'Vote recorded successfully',
      poll: savedVote,
      success: true,
      debug: {
        userId,
        optionId,
        newVoteCount: option.voteCount,
      },
    });
  } catch (error) {
    console.error('Vote error details:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      message: 'Server error',
      error: error.message,
      details: error.toString(),
    });
  }
};

// Make sure your route is correctly defined
// router.route('/vote/:voteId/vote/:optionId').post(authenticate, voteOnOption);
const joinVotingRoom = async (req, res) => {
  try {
    const { voteId } = req.params; // assuming you send voteId in URL
    const userId = req.user.id;

    const voteRoom = await Vote.findById(voteId);
    if (!voteRoom)
      return res.status(404).json({ message: 'Voting room not found' });

    const alreadyJoined = voteRoom.participants.some(
      (p) => p.toString() === userId,
    );

    if (alreadyJoined) {
      return res.status(400).json({ message: 'User already joined' });
    }

    // Add user to participants array
    voteRoom.participants.push(userId);
    await voteRoom.save();

    res.status(200).json({
      message: 'Joined voting room successfully',
      participants: voteRoom.participants,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  home,
  register,
  login,
  createRoom,
  getRoomDetails,
  joinRoom,
  joinRoomFromLink,
  participants,
  getRoomById,
  CreateVotingRoom,
  getVotingRoom,
  voteOnOption,
  joinVotingRoom,
};
