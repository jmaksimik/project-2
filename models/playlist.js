const mongoose = require("mongoose");
const Schema = mongoose.Schema

const commentSchema = new Schema({
    text: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    userName: String
});

const songSchema = new Schema({
    title: {
        type: String,
        required: true
      },    
      artist: {
         type: String,
         required: true
      },
      genre: String,
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
});

const playlistSchema = new Schema({
    playlistName: {
        type: String,
        required: true
    },
     userName: String,
     comments: [commentSchema],
     songs: [songSchema],
     user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
     }
});

module.exports = mongoose.model('Playlist', playlistSchema);