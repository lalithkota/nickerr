var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var Zebra = require('../models/zebra');
var LocalStrategy = require('passport-local');

var router = express.Router();

var generic_info = {
  'title': 'Nickerr',
  'navbar_bottom_name' : 'Dashboard',
  'name_placeholder' : 'Enter your Name',
  'username_placeholder' : 'Enter a new Username',
  'password_placeholder' : 'Enter your Password',
  'repassword_placeholder' : 'Reenter your Password',
  'submit_text' : 'Register',
  'register_heading' : 'Register',
  'register_error_msg':'',
};

passport.use('register-local',new LocalStrategy(
  function(username, password, done) {
    Zebra.findOne({ username: username }, function (err, user) {
      if (err) {return done(err); }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'User With Name Already exists' });
      }
      return done(null, user, { message: 'Account Already Exists. Logging In.' });
    });
  }
));

router.get('/',
  function(req, res, next) {
    res.render('register', generic_info);
  }
);

router.post('/', passport.authenticate('register-local',{successRedirect: '/home'}), function(req,res,next){
  var new_user = new Zebra({Name : req.body.Name, username: req.body.username, password : req.body.password, followings : req.body.username_r, followers : req.body.username_r,});

  console.log('New user');
  console.log(new_user);
  new_user.save(function(err,users){
    if (err){
      console.error('Unable to add to database');
      return console.error(err);
    }
  });
}, passport.authenticate('register-local',{successRedirect: '/home'}));

module.exports = router;
