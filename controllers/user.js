const User = require("../models/user");

exports.getUserById = async (req, res, next, id) => {
  User.findOne({id}).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user found in DB",
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = async (req, res) => {
  // req.profile.password = undefined;
  // req.profile.createdAt = undefined;
  // req.profile.updatedAt = undefined;
  const users = await User.find();
  res.status(200).json({
    users,
    message: 'user list'
  });
};

exports.updateUser = (req, res) => {
  console.log('req.profile from update data -->', req.profile)
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorized to update this user",
        });
      }
      res.status(200).json({
        user,
        message: 'User data updated successfully',
        success: true
      });
    }
  );
};