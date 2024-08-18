const { Router } = require("express");
const userRoute = Router();
const userController = require("../../controller/userController");
const signup = require("../../controller/signup");
const login = require("../../controller/login");

userRoute.post("/signup", signup);
userRoute.post("/login", login);
userRoute.get("/getAllUser", userController.getAllUser);
module.exports = userRoute;
