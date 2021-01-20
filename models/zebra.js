const mongoose = require('mongoose');

var zebraSchema = new mongoose.Schema({
    username : String,
    Name : String,
    password : String,
    following : String,
    followers : String,
    liked_nicks : String,
});

// any methods
zebraSchema.methods.validPassword = function(password){
  return password=== this.password;
}

var Zebra = mongoose.model('Zebra',zebraSchema);

module.exports = Zebra;
