const jwt = require('jsonwebtoken');
const User = require('./../model/userModel');

//signup
exports.signup = async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  newUser.save();
  res.status(201).json({
    token,
    status: 'success',
    data: newUser,
  });
  res.send();
};


//login

exports.login = (req, res, next) => {
  const {email, password} = req.body;

  //1. if email or password is not exist
  if(!email || !password){
    res.send('Please provide your email and password')
  }
  const token = '';
  //2. Everything is ok
  res.status('200').json({
    status:'success',
    token,
  });
}