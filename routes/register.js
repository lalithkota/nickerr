var express = require('express');
var mongoose = require('mongoose');
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

router.get('/',
  function(req, res, next) {
    if (req.isAuthenticated()){
      res.redirect('/home');
      return;
    }
    generic_info['register_error_msg'] = req.flash('error');
    res.render('register', generic_info);
  }
);

router.post('/', function(req,res,next){
  if(req.body.username==='' || req.body.Name==='' || req.body.password===''){
    generic_info['register_error_msg'] = 'Missing Credentials';
    res.render('register', generic_info);
    return;
  }
  // if(req.body.name[0]=='@'){
  //   Not allowed
  // }
  // if(req.body.username.split(' ').length>1 || req.body.username.split(',').length>1){
  //   Not allowed
  // }
  Zebra.findOne({ username: req.body.username }, function (err, user) {
    if (err) {
      generic_info['register_error_msg'] = 'Error reading database. Or some other Error';
      res.render('register', generic_info);
    }
    else if (!user){
      var new_user = new Zebra({Name : req.body.Name, username: req.body.username, password : req.body.password, followings : req.body.username_r, followers : req.body.username_r,});

      console.log('New user');
      new_user.save(function(err,users){
        if (err){
          console.error('Unable to add to database');
          return console.error(err);
        }
        console.log(users);
      });
      req.flash('error','User Creation Success login again');
      res.redirect('/login');
    }
    else if (!user.validPassword(req.body.password)) {
      generic_info['register_error_msg'] = 'User With Name Already exists';
      res.render('register', generic_info);
    }
  });
});

module.exports = router;
