const mongoose = require('mongoose');
const DB = process.env.DB_URL.replace('<username>', process.env.DB_USER)
          .replace('<password>', process.env.DB_PASS);

const connection = async () => {
  try{
    await mongoose.connect(DB);
  }catch(err){
    throw err;
  }
};

module.exports = connection;
