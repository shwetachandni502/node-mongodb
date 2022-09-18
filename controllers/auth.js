const User = require("../models/user");
const { validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var { expressjwt: expressJwt } = require("express-jwt");
const bcrypt = require('bcryptjs');
require('dotenv').config();

exports.signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const userExists = await User.find({ email: req.body.email });
  if(userExists.length) {
    return res.status(400).json({
      message: 'This email id already exists please try using another email id.',
      success: false
    });
  }

  const user = new User({
    ...req.body,
    password: bcrypt.hashSync(req.body.password, 10)
  });
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        message: "something went wrong!",
        success: false
      });
    }
    res.status(200).json({
      user,
      success: 'User registration successfully',
      success: true
    });
  });
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  User.findOne({ email }, async (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User email does not exists",
      });
    }

    const comparePass = await bcrypt.compare(password, user.password);
    if (!comparePass) {
      return res.status(401).json({
        message: "Invalid email and password",
        success: false
      });
    }

    //create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);

    //put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    const { _id, name, email } = user;
    res.status(200).json({
      token,
      user: { _id, name, email },
      message: "login successfully",
      success: true
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User Signout successfully",
  });
};

//protected routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
  algorithms: ["HS256"]
});

//custome middlewares
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "Access Denied",
    });
  }
  next();
};