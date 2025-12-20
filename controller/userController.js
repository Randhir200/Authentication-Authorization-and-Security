const User = require('../model/userModel');
const { response } = require('../utils/response');
exports.getAllUser = async (req, res) => {
  
  let queryStr = JSON.stringify(req.query);
  queryStr = queryStr.replace(/\b gte|gt|lte|lt \b/g, match => `$${match}`);

  const users = await User.find(JSON.parse(queryStr));
  response(res, 'success', 'All users fetched successfully', users);
}