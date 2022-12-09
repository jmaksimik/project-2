const express = require('express');
const router = express.Router();
const playlistCtrl = require('../controllers/playlists');
const isLoggedIn = require('../config/auth');

router.get('/new', isLoggedIn, playlistCtrl.new);
router.get('/', isLoggedIn, playlistCtrl.index);
router.post('/', isLoggedIn, playlistCtrl.create);
router.get('/community', playlistCtrl.allPlaylists);
router.get('/:id', playlistCtrl.show)
router.delete('/:id', isLoggedIn, playlistCtrl.delete);



module.exports = router;