

module.exports = {
    'facebookAuth': {
        'clientID': process.env.FACEBOOK_KEY,
        'clientSecret': process.env.FACEBOOK_SECRET,
        'callbacURL': process.env.APP_URL + 'auth/facebook/callback'
    }
};