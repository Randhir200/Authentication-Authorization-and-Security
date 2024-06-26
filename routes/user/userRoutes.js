const { Router } = require('express');
const userRoute = Router();
const userController = require('../../controller/userController');
const authController = require('../../controller/authController');

userRoute.post('/signup', authController.signup);
userRoute.post('/login', authController.login);
userRoute.get('/', (req, res)=>{
    res.send('Respons Get Back');
});
module.exports = userRoute;
