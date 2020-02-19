var express = require('express');
var router = express.Router();

router.get('/nearby', function(req, res, next) {
  res.render('nearby', {});
});

router.get('/weather', function(req, res, next) {
  res.render('weather', {});
});
 

module.exports = router;