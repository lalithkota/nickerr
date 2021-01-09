var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Nickerr', navbar_bottom_name : 'Dashboard' });
});

module.exports = router;
