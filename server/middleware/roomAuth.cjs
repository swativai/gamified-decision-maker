const jwt = require('jsonwebtoken');
const Room = require('../models/room.cjs'); // path ko correct karo

const roomAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res
        .status(401)
        .json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const room = await Room.findById(decoded.roomId);

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    req.room = room;
    next();
  } catch (error) {
    console.error('Room auth error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = roomAuth;
