var express = require('express');
var router = express.Router();
const userRoute = require('./user');
const authRoute = require('./auth');
const providerRoute = require('./provider');

router.use('/user', userRoute);
router.use('/auth', authRoute);
router.use('/provider', providerRoute);

module.exports = router;