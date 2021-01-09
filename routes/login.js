var express = require('express');
var passport = require('passport');
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

router.get('/',
  function(req, res, next) {
    res.render('login', generic_info);
  }
);

router.post('/',
  function(req, res, next) {
    if(req.body.username===''){
      generic_info['login_error_msg'] = 'Username Empty';
      res.render('login', generic_info);
    }
    else{
      passport.authenticate('local',function(err,user,info){
        if (err){
          generic_info['login_error_msg']= 'Something wrong. Unable to get users';
          res.render('login', generic_info);
        }
        else if (user===false) {
          if(info.message==='u'){
            generic_info['login_error_msg']= 'Username not found';
            res.render('login', generic_info);
          }
          else if (info.message==='p'){
            generic_info['login_error_msg']= 'Wrong Password';
            res.render('login', generic_info );
          }
        }
        else{

        }
      })(res,req,next);
    }
  }
);

module.exports = router;
