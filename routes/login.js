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
  'username_placeholder_r' : 'Enter a new username',
  'password_placeholder_r' : 'Enter your Password',
  'name_placeholder_r' : 'Enter your Name',
  'repassword_placeholder_r' : 'Re-enter your Password',
  'submit_text_r' : 'Register',
  'login_error_msg' : '',
  'register_error_msg' : '',
};

passport.use(new LocalStrategy(
  function(username, password, done) {
    Zebra.findOne({ username: username }, function (err, user) {
      console.log('Finding one user');
      if (err) {return done(err); }
      if (!user) {
        return done(null, false, { message: 'u' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'p' });
      }
      return done(null, user);
    });
  }
));

router.get('/',
  function(req, res, next) {
    generic_info['login_error_msg'] = '';
    generic_info['register_error_msg'] = '';
    res.render('login', generic_info);
  }
);

router.post('/',
  function(req, res, next) {

    if(req.body.login_register==='l'){
      if(req.body.username===''){
        generic_info['login_error_msg'] = 'Username Empty';
        generic_info['register_error_msg'] = '';
        res.render('login', generic_info);
      }
      else{
        passport.authenticate('local',function(err,user,info){
          if (err){
            generic_info['login_error_msg']= 'Something wrong. Unable to get users';
            generic_info['register_error_msg']= '';
            res.render('login', generic_info);
          }
          else if (user===false) {
            if(info.message==='u'){
              generic_info['login_error_msg']= 'Username not found';
              generic_info['register_error_msg']= '';
              res.render('login', generic_info);
            }
            else if (info.message==='p'){
              generic_info['login_error_msg']= 'Wrong Password';
              generic_info['register_error_msg']= '';
              res.render('login', generic_info );
            }
          }
          else{
            // res.redirect('/home',{});
          }
        })(res,req,next);
      }
    }
    else if(req.body.login_register==='r'){
      if(req.body.username_r===''){
        generic_info['login_error_msg']= '';
        generic_info['register_error_msg'] = 'Username Empty';
        res.render('login', generic_info);
      }
      else{
        console.log('Finding one user');
        Zebra.findOne({ username: req.body.username_r }, function (err, user) {
          if (err) {return done(err); }
          if (!user) {
            var new_user = new Zebra({Name : req.body.name_r, username: req.body.username_r, password : req.body.password_r,followings : req.body.username_r.concat(','), followers : req.body.username_r.concat(','),});

            console.log('New user');
            console.log(new_user);
            new_user.save(function(err,users){
              if (err){
                console.error('Unable to add to database');
                return console.error(err);
              }
              // console.log(users);
            });
            generic_info['login_error_msg']= 'User Creation Sucess. Please Login again.';
            generic_info['register_error_msg'] = '';
            res.render('login', generic_info);
          }
          else{
            generic_info['login_error_msg']= '';
            generic_info['register_error_msg'] = 'User Already exists';
            res.render('login', generic_info);
          }
        });

      }
    }
  }
);

module.exports = router;
