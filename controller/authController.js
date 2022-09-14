const jwt = require('jsonwebtoken');
const User = require('./../model/userModel');
exports.signup = async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
  newUser.save();
  res.status(201).json({
    token,
    status: 'success',
    message: newUser,
  });
  res.send();
};
