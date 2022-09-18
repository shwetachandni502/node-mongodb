var express = require("express");
var router = express.Router();
const { createProvider } = require("../controllers/provider");
const checkAuth = require('../middleware/checkAuth');

router.post("/", checkAuth, createProvider);

module.exports = router;