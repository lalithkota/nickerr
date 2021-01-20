var express = require('express');
var passport = require('passport');
var Nicker = require('../models/nicker');
var router = express.Router();

router.get('/',
  function(req, res, next) {
    if(!req.isAuthenticated()){
      res.redirect('/login');
    }
    else{
      Nicker.find({
        user : {
          "$in" : String(req.user.following).split(','),
        },
      },
      function(err, result){
        if(err) return handleError(err);

        res.render('home', {
          title: 'Nickerr',
          home_name: 'Home',
          users_Name: req.user.Name,
          submit_nicket_text : 'Post',
          nickers_list : result,
          my_followers_list : String(req.user.followers).split(','),
          nicker_text_placeholder : 'Type It Off. Ta Type It Off. Ta Ta ta.. Type It Off.Ta Type It Off.'
        });
      });
    }
  }
);

router.post('/',function(req, res, next){
  if(req.body.nicker_text===''){
    res.send();
    return;
  }
  Nicker.countDocuments(function (err, count) {
    if (err){
      console.error('Unable to get count');
      return console.error(err);
    }

    var new_nicker = new Nicker({
      _id : count,
      content : req.body.nicker_text,
      user : req.user.username,
      date:'0',
      time:'0',
      reply_to : -1,
      likers : ',',
    });
    new_nicker.save(function(err, nickers){
      if (err){
        console.error('Unable to add to database');
        return console.error(err);
      }
      console.log(nickers);
    });
  });
  res.redirect('/home');
});
module.exports = router;
