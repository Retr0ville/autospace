const express = require('express');
const router = express.Router();
const { login_user, register_user } = require('../controllers/authControllers');

router.post('/login', login_user);
// router.post('/logout, logout);
router.post('/register', register_user);

module.exports = router