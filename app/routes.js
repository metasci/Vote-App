
module.exports = function(app, passport){
    
    
    app.get('/', isLoggedIn, function(req, res){
        
        res.render('index', {
            logger: 0,
            message: req.flash('signupMessage')
        });
    });
    
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/',
        failureFlash: true
    }));
    
    app.post('/login', function(req, res){
        res.send(req.body);
    });
    
    
    app.get('/polls', function(req, res) {
        res.render('polls', {
            home: 'You Logged In!',
            user: req.user,
            logger: 1
        });
    });
    
    app.get('/auth/facebook', passport.authenticate('facebook'));
    
    app.get('/auth/facebook/callback',
      passport.authenticate('facebook', { successRedirect: '/', // send user back to homepage with name in upper right instead of login option
                                          failureRedirect: '/' }));
        
        
    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });
};

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        res.redirect('/polls');  
    }else {
        return next();
    }
    
}