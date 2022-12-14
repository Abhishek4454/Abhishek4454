const passport= require('passport');
const localStartegy=require('passport-local').Strategy;

const User= require('../models/user');

passport.use(new localStartegy({
    usernameField:'email'
},

function(email,password,done){
    //find user and establish the identity
    User.findOne({email:email},function(err,user){
        if(err){
            console.log('Error in finding the user--->passport');
            return done(err);
        }

        if(!user || user.password !=password){
            console.log('Invalid username/password');
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

module.exports=passport;