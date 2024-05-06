const { Router } = require('express');
const router = Router();
const  tourController  = require('../controller/tourController');
router.route('/').get(tourController.getAlldata);
module.exports = router;
 