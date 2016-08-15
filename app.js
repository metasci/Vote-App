
// make these technologies available for use in this file
var express = require('express');
var session = require("express-session"); // necessary for req.user in route.js
var routes = require('./app/routes.js');
var mongoose = require('mongoose');
var passport = require('passport');
var path = require('path');
var bodyParser = require('body-parser');
var flash = require('connect-flash');

var app = express();


app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// load .env file variables for use 
require('dotenv').load();

// import passport.js as function and call with parameter (passport)
require('./config/passport.js')(passport);

// connect to database
mongoose.connect(process.env.MONGO_URI);



// creates req.body object -- comes in handy with <form>
app.use(bodyParser.urlencoded({
    extended: true
}));
// ------ figure out exactly what this is doing
app.use(session({ secret: 'anything',
    saveUninitialized: true,
    resave: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


routes(app, passport);


var port = process.env.PORT || 8080;
app.listen(port, function(){
    console.log('Listening on port ' + port + '...');
});

