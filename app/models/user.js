'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    facebook: {
        id: String,
        token: String,
        name: String
    },
    local: {
        username: String,
        email: String,
        password: String
    }//,
    //polls: {
        //saved user polls --   
    //}
});

module.exports = mongoose.model('User', User);