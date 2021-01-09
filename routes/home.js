var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/',
  function(req, res, next) {
    if(!req.isAuthenticated()){
      res.redirect('login');
    }
    else{
      res.render('home', { title: 'Nickerr' });
    }
  }
);

module.exports = router;
