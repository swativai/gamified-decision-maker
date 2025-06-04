const express = require('express');
const {
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
} = require('../controllers/auth-controller.cjs');
const authenticate = require('../middleware/authenticate.cjs');
const router = express.Router();

router.route('/').get(home);

router.route('/register').post(register);

router.route('/login').post(login);

router.route('/create/room').post(authenticate, createRoom);

router.route('/room/details').get(authenticate, getRoomDetails);

router.route('/join/room').post(authenticate, joinRoom);

router
  .route('/room/join-from-link/:roomCode')
  .post(authenticate, joinRoomFromLink);

router.route('/room/:roomId/participants').get(authenticate, participants);
router.route('/room/:roomId').get(authenticate, getRoomById);

router.route('/create/voting_room').post(authenticate, CreateVotingRoom);
router.route('/get/voting_room').get(authenticate, getVotingRoom);
router.route(' /vote/:voteId/vote/:optionId').put(authenticate, voteOnOption);
router.route('/join/:voteId').post(authenticate, joinVotingRoom);
module.exports = router;
