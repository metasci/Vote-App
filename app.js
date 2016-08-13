
// make these technologies available for use in this file
var express = require('express');
var session = require("express-session"); // is this necessary?
var routes = require('./app/routes.js');
var mongoose = require('mongoose');
var passport = require('passport');
var path = require('path');

var app = express();


app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// load .env file variables for use 
require('dotenv').load();

// import passport.js as function and call with parameter (passport)
require('./config/passport.js')(passport);

// connect to database
// why does mongod --nojournal not work
mongoose.connect(process.env.MONGO_URI);




// ------ figure out exactly what this is doing
app.use(passport.initialize());
app.use(passport.session());


routes(app, passport);


var port = process.env.PORT || 8080;
app.listen(port, function(){
    console.log('Listening on port ' + port + '...');
});

