const mongoose = require('mongoose');

const zebraSchema = new mongoose.Schema({
    username : String,
    Name : String,
    password : String,
    followings : String,
    followers : String,
});

// any methods

const Zebra = mongoose.model('Zebra',zebraSchema);

module.exports = Zebra;
