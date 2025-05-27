const Room = require('../models/room.cjs');
const User = require('../models/user.cjs');
const { nanoid } = require('nanoid');
const mongoose = require('mongoose');
const { default: Vote } = require('../models/vote.cjs');

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
  const creatorId = req.user.id; // this value got  from JWT middleware
  const roomCode = nanoid(8).toUpperCase(); // e.g., 'abc123xy'
  const inviteLink = `http://localhost:5173/room/${roomCode}`;
  try {
    const room = await Room.create({
      title,
      description,
      creatorId,
      maxParticipants,
      roomCode,
      inviteLink,
    });
    res.status(201).json(room);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Room creation failed', error: err.message });
  }
};

const getRoomDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const rooms = await Room.find({ creatorId: userId })
      .populate('creatorId', 'username email') // only get username & email
      .sort({ createdAt: -1 }); // latest first

    res.status(200).json(rooms);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to fetch rooms', error: error.message });
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
  console.log('Room ID from params:', roomId);
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

    const formattedOptions = options.map((opt) => ({ text: opt, votes: [] }));

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
    const rooms = await Vote.find()
      .populate('creator', 'username email') // To get creator info
      .select('-__v'); // Optional: exclude __v field

    res.status(200).json(rooms);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while fetching rooms' });
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
};
