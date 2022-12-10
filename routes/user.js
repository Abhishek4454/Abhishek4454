const express = require('express');
const router = express.Router();

console.log('User routes loaded : ');

const userController = require('../controllers/user_controller');

router.get('/profile', userController.profile);

router.get('/user-signIn', userController.signIn);
router.get('/user-signUp', userController.signUp);

router.post('/create', userController.create);


module.exports = router;