const express = require('express');
const connection = require('./config/db');
const app = express();
const userRoute = require('./routes/userRoutes');
const route = require('./routes/tourRoutes');
app.use(express.json());
app.use('/users', userRoute);
app.use('/tours', route);
const port = process.env.PORT || 7000;
app.listen(port, async () => {
  await connection();
  console.log('connection established');
});
