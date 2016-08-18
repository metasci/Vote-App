var localStrategy = require('passport-local').Strategy;
var facebookStrategy = require("passport-facebook").Strategy;
var User = require('../app/models/user');
var configAuth = require("./auth");

module.exports = function(passport){
    
    passport.serializeUser(function(user, done){
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err, user);
        });
    });
    
    
   
    passport.use('local-login', new localStrategy({
        usernameField: 'email',
        passReqToCallback: true
    },
    function(req, email, password, done){
        process.nextTick(function(){
            User.findOne({'local.email': email}, function(err, user){
                if(err) return done(err);
                if(!user) return done(null, false, req.flash('loginMessage', 'No User Found'));
                if(user.local.password !== password) return done(null, false, req.flash('loginMessage', 'Invalid Password'));
                
                return done(null, user);
                
            });
        });
    }));
    
    passport.use('local-signup', new localStrategy({
        usernameField: 'email',
        passReqToCallback: true
    }, 
    function(req, email, password, done){
        // console.log(req.body);
        process.nextTick(function(){
            User.findOne({'local.email': email}, function(err, user){
                if(err) return done(err);
                if(user){           
                    return done(null, false, req.flash('signupMessage', 'That email already taken!'));
                } else if(password.length < 3){
                    return done(null, false, req.flash('signupPasswordMessage', 'Password must be longer than 3 characters!'));
                }else {
                    var newUser = new User();
                    
                    newUser.local.email = email;
                    newUser.local.username = req.body.name;
                    newUser.local.password = password; // not secure yet -- need to hash password before saving to db
                    
                    newUser.save(function(err){
                        if(err) throw err;
                        return done(null, newUser);
                    });
                }
            });
        });
    }));
    
    
    passport.use(new facebookStrategy({
            clientID: configAuth.facebookAuth.clientID,
            clientSecret: configAuth.facebookAuth.clientSecret,
            callbackURL: configAuth.facebookAuth.callbacURL
        
        },
        function(accessToken, refreshToken, profile, cb){
            process.nextTick(function(){
                User.findOne({'facebook.id': profile.id}, function(err, user){
                    if(err){
                        return cb(err);
                    }
                    
                    if(user){
                        return cb(null, user);
                    }else {
                        var newUser = new User;
                        newUser.facebook.id = profile.id;
                        newUser.facebook.token = accessToken;
                        newUser.facebook.name = profile.displayName;
                        
                        newUser.save(function(err){
                            if(err) throw err;
                            
                            return cb(null, newUser);
                        });
                    }
                });
            });
        }));
    
};
