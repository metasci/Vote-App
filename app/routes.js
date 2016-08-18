
module.exports = function(app, passport){
    
    
    app.get('/', autoLogin, function(req, res){
        
        res.render('index', {
            logger: 0,
            message: req.flash('signupMessage'),
            passMessage: req.flash('signupPasswordMessage'),
            loginMessage: req.flash('loginMessage'),
            home: 'active',
            signup: '',
            login: ''
        });
    });
    
    app.get('/signup', autoLogin, function(req, res){
        res.render('index', {
            logger: 0,
            message: req.flash('signupMessage'),
            passMessage: req.flash('signupPasswordMessage'),
            loginMessage: req.flash('loginMessage'),
            home: '',
            signup: 'active',
            login: '' 
        });
    });
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash: true
    }));
    
    // guest login
    app.get('/guest', function(req, res){
        
        // set user object
        // guest never actually logs in 
        req.user = guestMaker();
        
        res.render('polls', {
            home: 'You Logged In!',
            user: req.user,
            logger: 1
        });
    });
    
    
    
    app.get('/login', autoLogin, function(req, res){
       res.render('index', {
            logger: 0,
            message: req.flash('signupMessage'),
            passMessage: req.flash('signupPasswordMessage'),
            loginMessage: req.flash('loginMessage'),
            // these are for showing the correct panel on login/signup error
            home: '',
            signup: '',
            login: 'active' 
       }); 
    });
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));
    
    
    
    
    // facebook login 
    app.get('/auth/facebook', passport.authenticate('facebook'));
    
    app.get('/auth/facebook/callback',
      passport.authenticate('facebook', { successRedirect: '/', // send user back to homepage with name in upper right instead of login option
                                          failureRedirect: '/' }));
        
        
        
        
    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });
};

function autoLogin(req, res, next){
    if(req.isAuthenticated()){
        res.redirect('/polls');
    }else {
        return next();
    }
}


// make a guest object for anonymous users
function guestMaker(){
    return {
            facebook: {
                name: 0
            },
            local: {
                username: 'Guest',
                email: 'foo@bar.com',
                password: 'guest'
            }
        };
}