const Playlist = require('../models/playlist');

module.exports = {
    create
};

function create(req, res){
    Playlist.findById(req.params.id, function(err, plDoc){
        if (err) {
            return res.send('error from creating reviews; check the terminal');
        }
        req.body.user = req.user._id;
        req.body.userName = req.user.userName;
        plDoc.comments.push(req.body);
        plDoc.save(function(err){
            console.log('error in saving comment; check terminal')
            res.redirect(`/playlists/${req.params.id}`);
        })

    })
}