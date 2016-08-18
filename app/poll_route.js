
module.exports = function(app, passport) {
    
    
    // send authenticated users here to see polls
    app.get('/polls', isLoggedIn, function(req, res) {
        
        res.render('polls', {
            user: req.user,
            logger: 1
        });
    });
  
    app.post('/newPoll', function(req, res){
        res.send('got it');
        // save poll data to db in user profile
        // create url with question 
    });
};


function isLoggedIn(req, res, next){
       
    if(req.isAuthenticated()){
        return next();
    }else {
        res.redirect('/');
    }
}