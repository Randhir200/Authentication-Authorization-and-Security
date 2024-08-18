const jwt = require('jsonwebtoken');
const User = require('./../model/userModel');
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
//signup
exports.signup = async (req, res, next) => {
  const newUser = await User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newUser._id);
  try{
    await newUser.save();
   return res.status(201).json({
      token,
      status: 'success',
      data: newUser,
    });
  }catch(err){
  res.status(500).json({
    status: "failed",
    message: err
  })
  }
};

//login

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  //1.check email or password is exist
  if (!email || !password) {
    res.send('Please provide your email and password');
  }
  
  //2. check if user exist && password is correct
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    res
      .status(401)
      .json({ status: 'failed', message: 'Invalid username or password' });
  }

  //3. Everything is ok\
  const token = signToken(user._id);
  res.status(
    200).json({
    status: 'success',
    token,
  });
};
