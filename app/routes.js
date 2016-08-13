
module.exports = function(app, passport){
    
    
    // make so if user not logged in - redirect to /login
    app.get('/', function(req, res){
        res.render('index', {
            home: 'homepage'
        });
    });
    
    
    
    // tester route
    app.get('/success', function(req, res) {
        res.render('index', {
            home: 'You Logged In!'
        });
    });
    
    app.get('/auth/facebook', passport.authenticate('facebook'));
    
    app.get('/auth/facebook/callback',
      passport.authenticate('facebook', { successRedirect: '/success', // send user back to homepage with name in upper right instead of login option
                                          failureRedirect: '/login' }));
        
};