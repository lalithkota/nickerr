var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var Zebra = require('../models/zebra');
var LocalStrategy = require('passport-local');

var router = express.Router();

var generic_info = {
  'title': 'Nickerr',
  'navbar_bottom_name' : 'Dashboard',
  'username_placeholder' : 'Enter Username',
  'password_placeholder' : 'Enter Password',
  'submit_text' : 'Login',
  'register_button_text' : 'Signup',
  'login_heading' : 'For Login:',
  'register_heading' : 'For Signup:',
  'login_error_msg':'',
};

passport.use(new LocalStrategy(
  function(username, password, done) {
    Zebra.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Username not found' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect Password' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Zebra.findById(id, function(err, user) {
    done(err, user);
  });
});

router.get('/',
  function(req, res, next) {
    if (req.isAuthenticated()){
      res.redirect('/home');
      return;
    }
    var msgs = req.flash('error');
    generic_info['login_error_msg'] = msgs[msgs.length - 1];
    res.render('login', generic_info);
  }
);

router.post('/', passport.authenticate('local',{successRedirect: '/home',failureRedirect: '/login', failureFlash:true , badReqeustMessage : 'Empty Username and Password'}) );

module.exports = router;
