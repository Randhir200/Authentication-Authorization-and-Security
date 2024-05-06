const User = require('../model/userModel')
exports.getAllUser = async (req, res) => {
  console.log('users');
   const users = await User.find();
    res.status(200).json({
        status: 'success',
        data:users 
      });
}