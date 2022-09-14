const { Router } = require('express');
const userRoute = Router();
const userController = require('./../controller/userController');
userRoute.route('/').get(userController.getAllUser);
module.exports = userRoute;
