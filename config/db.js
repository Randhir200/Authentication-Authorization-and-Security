const mongoose = require('mongoose');
const DB = process.env.DB_URL.replace('<username>', process.env.DB_USER)
          .replace('<password>', process.env.DB_PASS);

const uri = "mongodb+srv://mailrandhirkr:Budget00@cluster.bkudr.mongodb.net/";

const connection = async () => {
  try{
    await mongoose.connect(uri);
  }catch(err){
    throw err;
  }
};

module.exports = connection;
