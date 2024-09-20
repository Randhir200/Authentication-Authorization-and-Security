const express = require("express");
require("dotenv").config();
const connection = require("./config/db");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("./logger");
const masterRoute = require("./routes/masterRoute");
const { auth } = require("./middleware/auth");
app.use(express.json());

app.use(cors());
// app.use(auth);
app.use("/", masterRoute);

// Use cookie-parser middleware
app.use(cookieParser());

app.get("/health", async (req, res) => {
  const mongoState = mongoose.STATES[mongoose.connection.readyState];
  if (mongoState === "connected") {
    logger.info(`mongoDb connection: up, ${mongoState}`);
    res.status(200).json({ status: "up", dbState: mongoState });
  } else {
    const DB = process.env.DB_URL.replace(
      "<username>",
      process.env.DB_USER
    ).replace("<password>", process.env.DB_PASS);
    logger.info(`mongoDb connection: down, ${mongoState}`);
    res.status(500).json({ status: "down", dbState: mongoState, PORT: DB });
  }
});

const port = process.env.PORT || 7000;
app.listen(port, async () => {
  try {
    await connection();
    console.log(`Database connection has been established`);
    console.log(`Server is running in the port : ${port}`);
  } catch (err) {
    console.log(`Somthing went wrong: ${err}`);
  }
});
