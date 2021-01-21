var express = require('express');
var Zebra = require('../models/zebra');
var router = express.Router();

router.get('/',
  function(req, res, next) {
    if(!req.isAuthenticated()){
      res.redirect('/login');
    }
    else{
      res.redirect('/zeb/'+req.user.username);
    }
  }
);
router.get('/:zebra_uname',
  function(req, res, next) {
    if(!req.isAuthenticated()){
      res.redirect('/login');
    }
    else{
      // res.send(req.params.zebra_uname);
      Zebra.findOne({username : req.params.zebra_uname},function(err, result){
        res.render('zebras', {
          title: 'Nickerr',
          home_name: 'Home',
          users_Name: req.user.Name,
          zebra_result: result,
        });
      });
    }
  }
);

module.exports = router;
