const mongoose = require('mongoose');

const nickerSchema = new mongoose.Schema({
    content : String,
    user : String,
    date : String,
    time : String,
});

// any methods

const Nicker = mongoose.model('Nicker',nickerSchema);

module.exports = Nicker;
