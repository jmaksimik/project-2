const Playlist = require('../models/playlist');

module.exports = {
    index,
    allPlaylists,
    create,
    new: newPlaylist,
    show,
    delete: deletePlaylist,
};

function deletePlaylist(req, res){
    Playlist.findOneAndDelete(
        {_id: req.params.id, user: req.user._id}, function(err){
            if(err){
                res.send('error in deleting, check terminal')
            };
            res.redirect('/playlists');
        }
    )
};

function show(req, res) {
    Playlist.findById(req.params.id, function (err, plDoc) {
        res.render('playlists/show', { playlist: plDoc })
    })
}

function create(req, res) {
    const newPlaylist = new Playlist(req.body);
    newPlaylist.user = req.user._id;
    newPlaylist.save(() => console.log('new playlist saved'))
    Playlist.findById(newPlaylist._id)
        .then(() => res.redirect('/playlists'))
}

function newPlaylist(req, res) {
    res.render('playlists/new');
}

async function allPlaylists(req, res) {
    let playlist = await Playlist.find({});
    res.render('playlists/all', {playlist});
}

async function index(req, res) {
    let playlist = await Playlist.find({user: req.user._id});
    res.render('playlists/index', { playlist });
}