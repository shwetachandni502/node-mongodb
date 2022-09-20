var express = require("express");
var router = express.Router();
const { getUserById, getUser, updateUser } = require("../controllers/user");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const checkAuth = require('../middleware/checkAuth');

router.param("userId", getUserById);
// router.get("/test/:userId", isSignedIn, isAuthenticated, getUser);
router.get("/", isSignedIn, checkAuth, getUser);
router.put("/:userId", isSignedIn, checkAuth, updateUser);

module.exports = router;