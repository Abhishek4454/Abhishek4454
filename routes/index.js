const express = require('express');
const router = express.Router();

console.log('routes loaded : ');

const homeController = require('../controllers/home_controller');


router.get('/', homeController.home);
router.use('/user', require('./user'));

router.use('/render', require('./render'));



module.exports = router;


