const Playlist = require('../models/playlist');

module.exports = {
    create,
    update
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

function update(req, res){
    Playlist.findOne({'comments._id': req.params.id}, function(err, playlist){
        const editedComment = playlist.comments.id(req.params.id);
        console.log(editedComment);
        //if (!editedComment.userId.equals(req.user.id)) return res.redirect(`playlists/${playlist._id}`);
        editedComment.text = req.body.text;
        playlist.save(function(err){
            if(err) res.send('error in editing comment');
            res.redirect(`/playlists/${playlist._id}`);
        })
    })
}