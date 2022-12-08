const mongoose = require("mongoose");
const Schema = mongoose.Schema

const playlistSchema = new Schema({
     title: String,
     artist: String,
     genre: String,
     user: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true
     },
     userName: String,
     comments: [commentSchema]
    }
);

const commentSchema = new Schema({
    text: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userName: String
});

module.exports = mongoose.model('Playlist', playlistSchema);