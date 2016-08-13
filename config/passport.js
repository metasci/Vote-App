
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
    
    // fix callback hell
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
                        newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                        
                        newUser.save(function(err){
                            if(err) throw err;
                            
                            return cb(null, newUser);
                        });
                    }
                });
            });
        }));
    
}
