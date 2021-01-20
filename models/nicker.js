const mongoose = require('mongoose');

const nickerSchema = new mongoose.Schema({
    _id : Number,
    content : String,
    user : String,
    date : String,
    time : String,
    reply_to : Number,
    likers : String,
});

// any methods

const Nicker = mongoose.model('Nicker',nickerSchema);

module.exports = Nicker;
