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
} = require('../controllers/auth-controller');
const authenticate = require('../middleware/authenticate');
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

router.route('/rooms/:roomId/participants').get(authenticate, participants);
router.route('/rooms/:roomCode').get(authenticate, getRoomById);
module.exports = router;
