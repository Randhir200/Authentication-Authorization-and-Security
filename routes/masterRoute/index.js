const express = require("express");
const userRoute = require("../user/userRoutes");
const masterRoute = express.Router();

masterRoute.use("/", userRoute);

module.exports = masterRoute;
