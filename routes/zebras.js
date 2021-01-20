var express = require('express');
var router = express.Router();

router.get('/',
  function(req, res, next) {
    if(!req.isAuthenticated()){
      res.redirect('/login');
    }
    else{
      res.render('zebras', {
        title: 'Nickerr',
        home_name: 'Home',
        users_Name: req.user.Name,
      });
    }
  }
);

module.exports = router;
