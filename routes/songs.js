const express = require('express');
const router = express.Router();
const songCtrl = require('../controllers/songs');
const isLoggedIn = require('../config/auth');

module.exports = router;