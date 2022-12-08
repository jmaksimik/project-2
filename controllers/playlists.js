module.exports = {
    index,
    allPlaylists
};

function allPlaylists(req, res){
    res.render('playlists/all');
    //res.send('hello world');
}

function index(req, res){
    res.render('playlists/index');
}