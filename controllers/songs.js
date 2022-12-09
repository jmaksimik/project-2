const Playlist = require('../models/playlist');

module.exports = {
    create
};

function create(req, res){
    Playlist.findById(req.params.id, function(err, playlist){
        req.body.user = req.user._id;
        if(err) {
            console.log(err);
            return res.send('error creating song; check terminal')
        }
        playlist.songs.push(req.body);
        console.log(playlist, '<- song submission');
        playlist.save();
            console.log(playlist);
            //console.log(req.params.id);
            res.redirect(`/playlists/${req.params.id}`);
        })
    }