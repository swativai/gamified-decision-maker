const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  text: String,
  votes: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      timestamp: Date,
    },
  ],
});

const votingRoomSchema = new mongoose.Schema({
  title: { type: String, required: true },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  options: [optionSchema],
  discussion: { type: String },

  // 🕒 Duration in user-provided format
  duration: {
    minutes: { type: Number, default: 0 },
    hours: { type: Number, default: 0 },
    days: { type: Number, default: 0 },
  },

  startTime: { type: Date, default: Date.now },
  endTime: { type: Date }, // Will be set based on duration

  isVotingOpen: { type: Boolean, default: true },

  finalResult: {
    selectedOption: String,
    tieBreakerUsed: String,
    revealedAt: Date,
  },
});
const Vote = mongoose.model('Vote', votingRoomSchema);

module.exports = Vote;
