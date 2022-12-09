const express = require('express');
const router = express.Router();
const songCtrl = require('../controllers/songs');
const isLoggedIn = require('../config/auth');

router.post('/playlists/:id/songs', isLoggedIn, songCtrl.create);

module.exports = router;