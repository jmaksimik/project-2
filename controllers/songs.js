const Playlist = require('../models/playlist');

module.exports = {
    create,
    delete: deleteSong
};

function deleteSong(req, res){
    Playlist.findOne(
        {'songs._id': req.params.id, 'songs.userId': req.user._id},
        function(err, playlist){
            if (!playlist || err) return res.redirect(`/playlists/${playlist._id}`);
            playlist.songs.remove(req.params.id);
            playlist.save(function(err){
                res.redirect(`/playlists/${playlist._id}`);
            })
        }
    )
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