const passport= require('passport');
const localStartegy=require('passport-local').Strategy;

const User= require('../models/user');

passport.use(new localStartegy({
    usernameField:'email',
    passReqToCallback:true
},

function(req,email,password,done){
    //find user and establish the identity
    User.findOne({email:email},function(err,user){
        if(err){
            //console.log('Error in finding the user--->passport');
            req.flash('error',err);
            return done(err);
        }

        if(!user || user.password !=password){
            //console.log('Invalid username/password');
            req.flash('error','invalid Username/Password');

            return done(null,false);
        }
        return done(null,user);
    });
}



));

//serialize user from the kwys in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});

//deserializing the cookies from the keys in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Eror in finding user--->passport');
            return done(err);
        }
       return done(null,user);
    });
});

//check if the user Authentication
passport.checkAuthentication =function(req,res,next){
   //if user is sign in then proceed to next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }
   //if user is not sign in
    return res.redirect('/user/user-signIn');
}

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contain the current sign in user from the current
        // session cookie and we are just sending it to the locals for the views
        res.locals.user=req.user;
    }
    next();
}

module.exports=passport;