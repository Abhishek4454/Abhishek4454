const express = require('express');
const app = express();
const port = 8000;
const db = require('./config/mongoose');

const passport=require('passport');
const passportLocal=require('./config/passport-local-startegy');
const flash= require('connect-flash');
const customMware= require('./config/middleware');



//used for session cookies
const session=require('express-session');

const cookie = require('cookie-parser');
const bodyParser = require('body-parser');
const expressLayout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const { Mongoose, default: mongoose } = require('mongoose');
const mongoStore=require('connect-mongo');

const sassMidleware=require('node-sass-middleware');
app.use(sassMidleware({
    src:'./assests/scss',
    dest:'./assests/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'

}));
//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');
//Mongo store is used to store session cookie
app.use(session({
    name:'Codeil',
    //TODO change the secret before deplpoyment
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(100 * 60 * 100)
    },
    store: mongoStore.create(
        { 
            mongoUrl:'mongodb://localhost/codeil_development',
            autoremove:'disabled'
        },
        function(err){
            console.log(err ||'connect setup ok');
        }
    
    )
    }));
    

//extract style from subpages into layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(expressLayout);
//make uploads available for use
app.use('/uploads',express.static(__dirname+'/uploads'));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static('./assests'));

app.use(cookieParser());


app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);
app.use('/', require('./routes'));



app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running server: ${err}`);
    }

    console.log(`Server is running on the port:  ${port}`)
})