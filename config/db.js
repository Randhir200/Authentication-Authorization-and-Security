const mongoose = require('mongoose');
require('dotenv').config()
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD)
const connection = async()=>{
    await mongoose.connect(DB)
}

module.exports = connection