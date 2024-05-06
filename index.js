const express = require('express');
require('dotenv').config();
const connection = require('./config/db');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('./logger');
const masterRoute = require('./routes/masterRoute');

app.use(express.json());
app.use(
  cors({
    origin: "",
    methods: "GET,POST",
    credentials: true, // allow session cookie from browser to pass through
    exposedHeaders: ["auth-token"],
  })
);

app.use('/', masterRoute);

app.get("/health", async (req, res) => {
  const mongoState = mongoose.STATES[mongoose.connection.readyState];
  
  if (mongoState === "connected") {
    logger.info(`mongoDb connection: up, ${mongoState}`);
    res.status(200).json({ status: "up", dbState: mongoState });
  } else {
    logger.info(`mongoDb connection: down, ${mongoState}`);
    res.status(500).json({ status: "down", dbState: mongoState, PORT: process.env.PORT });
  }
});

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
