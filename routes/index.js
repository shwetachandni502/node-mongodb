var express = require('express');
var router = express.Router();
const userRoute = require('./user');
const authRoute = require('./auth');

router.get('/', function(req, res, next) {
  res.send('route working');
});

router.use('/user', userRoute);
router.use('/auth', authRoute);

module.exports = router;