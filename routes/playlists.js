const express = require('express');
const router = express.Router();
const playlistCtrl = require('../controllers/playlists');
const isLoggedIn = require('../config/auth');

router.get('/', playlistCtrl.index);
router.get('/community', playlistCtrl.allPlaylists);

module.exports = router;