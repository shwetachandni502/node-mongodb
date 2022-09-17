var express = require("express");
var router = express.Router();
const { getUserById, getUser, updateUser } = require("../controllers/user");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    message: 'respond with a resource user route file',
    success: true,
  });
});

router.param("userId", getUserById);
// router.get("/test/:userId", isSignedIn, isAuthenticated, getUser);
router.get("/:userId", isSignedIn, getUser);
router.put("/:userId", isSignedIn, updateUser);

module.exports = router;