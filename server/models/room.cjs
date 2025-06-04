const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const roomSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  creator: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: { type: String },
    email: { type: String, required: true },
  },
  maxParticipants: {
    type: Number,
    default: 0, // 0 means unlimited
  },
  createdAt: { type: Date, default: Date.now },
  roomCode: {
    type: String,
    required: true,
    unique: true,
  },
  inviteLink: {
    type: String,
    required: true,
  },
  isOpen: {
    type: Boolean,
    default: true,
  },
  participants: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      name: { type: String },
      email: { type: String },
      joinedAt: { type: Date, default: Date.now },
    },
  ],
});
roomSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        roomId: this._id.toString(),
        roomCode: this.roomCode,
        title: this.title,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '30d',
      },
    );
  } catch (error) {
    console.error(error);
  }
};

const Room = new mongoose.model('Room', roomSchema);
module.exports = Room;
