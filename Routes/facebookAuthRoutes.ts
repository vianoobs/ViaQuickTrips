const passport = require('passport');

const facebookAuthRoutes = (app) => {

    // log users in
    app.get("/auth/facebook", passport.authenticate("facebook"));

    app.get("/auth/facebook/callback", passport.authenticate("facebook"), (req, res) => {
        res.redirect('http://localhost:8080')
    });
};

export default facebookAuthRoutes;
