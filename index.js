const express = require('express');
require('dotenv').config();
const connection = require('./config/db');
const app = express();
const userRoute = require('./routes/userRoutes');
const route = require('./routes/tourRoutes');

app.use(express.json());
app.use('/users', userRoute);
app.use('/tours', route);

const port = process.env.PORT || 7000;
app.listen(port, async () => {
  try{
    await connection();
    console.log(`Database connection has been established`);
    console.log(`Server is running in the port : ${port}`);
  }catch(err){
   console.log(`Somthing went wrong: ${err}`);
  }
});
