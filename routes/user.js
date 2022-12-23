const express = require('express');
const router = express.Router();
const passport=require('passport');


console.log('User routes loaded : ');

const userController = require('../controllers/user_controller');

router.get('/profile/:id', passport.checkAuthentication, userController.profile);

router.get('/user-signIn', userController.signIn);
router.get('/user-signUp', userController.signUp);

router.post('/create', userController.create);

//use passport as middleware as authenticate
router.post('/create-session',passport.authenticate(
    'local',{failureRedirect:'/user/user-signIn'},
), userController.createSession);

router.get('/user-signOut',userController.destroySession);

module.exports = router;