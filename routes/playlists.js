const express = require('express');
const router = express.Router();
const playlistCtrl = require('../controllers/playlists');
const isLoggedIn = require('../config/auth');

router.get('/', playlistCtrl.index);

module.exports = router;