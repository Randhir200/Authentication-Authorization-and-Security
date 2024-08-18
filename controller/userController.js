const User = require('../model/userModel')
exports.getAllUser = async (req, res) => {
  console.log('users');
  const {username, email} = req.query;
  // const queryObj = {...req.query};
  // const excludeFields = ['username'];
  // excludeFields.forEach((el)=> delete queryObj[el]);
  
  let queryStr = JSON.stringify(req.query);
  queryStr = queryStr.replace(/\b gte|gt|lte|lt \b/g, match => `$${match}`);

  console.log('queryStr-----\n',queryStr);

  console.log('req-----------\n', username, email);
  //  const users = await User.find({
  //   email
  //  });
  // const users = await User.find().where('email').equals('mail.randhirkr@gmail.com').limit(0);
  // const users = await User.find();
  const users = await User.find(JSON.parse(queryStr));
    res.status(200).json({
        status: 'success',
        data:users 
      });
}