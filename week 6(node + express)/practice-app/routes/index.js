var express = require('express');
var router = express.Router();

var users = require("./users")

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(users);
  res.send({
    index : 'index page'
  });
});


// User API
router.use('/users',users);
module.exports = router;
