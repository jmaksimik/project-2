const Playlist = require('../models/playlist');

module.exports = {
    index,
    allPlaylists,
    create,
    new: newPlaylist,
    show
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

function allPlaylists(req, res) {
    res.render('playlists/all');
}

async function index(req, res) {
    let playlist = await Playlist.find({});
    res.render('playlists/index', { playlist });
}