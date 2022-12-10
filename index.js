const express = require('express');
const app = express();
const port = 8000;
const db = require('./config/mongoose');
const cookie = require('cookie-parser');
const bodyParser = require('body-parser');
const expressLayout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');

//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//extract style from subpages into layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.use(expressLayout);
app.use(bodyParser.urlencoded({ extended:false }));
app.use(express.static('./assests'));

app.use(cookieParser());



app.use('/', require('./routes'));



app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running server: ${err}`);
    }

    console.log(`Server is running on the port:  ${port}`)
})