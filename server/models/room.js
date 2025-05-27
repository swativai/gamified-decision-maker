const mongoose = require('mongoose');
const roomSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
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
  options: [{ text: String, submittedBy: mongoose.Schema.Types.ObjectId }],
  votes: [{ optionText: String, votedBy: mongoose.Schema.Types.ObjectId }],
  finalResult: { type: String },
  tiebreakerUsed: { type: String },
});

const Room = new mongoose.model('Room', roomSchema);
module.exports = Room;
