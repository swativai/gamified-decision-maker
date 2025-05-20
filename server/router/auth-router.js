const express = require('express');
const { home, register, login } = require('../controllers/auth-controller');

const router = express.Router();

router.route('/').get(home);

router.route('/register').post(register);

router.route('/login').post(login);

module.exports = router;
