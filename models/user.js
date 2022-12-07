const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create your User Model
const userSchema = new Schema({
    userName: String,
    email: String,
    googleId: {
        type: String,
        required: true
    } 
});

module.exports = mongoose.model('User', userSchema);