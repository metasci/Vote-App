var User = require('../app/models/user');


module.exports = function(app, passport) {
    
    
    // send authenticated users here to see polls
    app.get('/polls', isLoggedIn, function(req, res) {
        
        res.render('polls', {
            user: req.user,
            logger: 1,
            newPollShow: 'active',
            congratShow: ''
        });
    });
  
    app.post('/newPoll', function(req, res){
        User.findById(req.body.currentUser, function(err, user){
            if(err) throw err;
            
            user.polls.push(makePoll(req.body));
            
            user.update(user, function(err, user){
                if(err) throw err;
                
                console.log("database updated", user);
            
            });
                // res.json(user);
            
            res.render('polls', {
                user: user,
                logger: 1,
                newPollShow: '',
                congratShow: 'active'
            });
        });
        // save poll data to db in user profile
        // create url with   -- if url already exists -- alert user and provide link to existing poll 
    });
};


function isLoggedIn(req, res, next){
       
    if(req.isAuthenticated()){
        return next();
    }else {
        res.redirect('/');
    }
}



function makePoll(body){
    return {
        question: body.pollName,
        options: body.option
    }
}