const { Router } = require('express');
const userRoute = Router();
const userController = require('./../controller/userController');
const authController = require('./../controller/authController');

userRoute.post('/signup', authController.signup)
userRoute.route('/').get(userController.getAllUser);

module.exports = userRoute;
