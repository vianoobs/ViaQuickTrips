const passport = require('passport');

module.exports = (app) => {

    // log users in
    app.get("/auth/facebook", passport.authenticate("facebook"));

    app.get("/auth/facebook/callback", passport.authenticate("facebook"), (req, res) => {
        res.redirect('/')
    });
};

