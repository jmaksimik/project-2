const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');

router.post('/playlists/:id/comments', commentsCtrl.create);
router.put('/comments/:id', commentsCtrl.update)

module.exports = router;