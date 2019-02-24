const passport = require('passport');
const googleAuthRoutes = (app) => {

    // log users in
    app.get("/api/auth/google", passport.authenticate("google", {
        scope: ['email', 'profile']
    }));

    app.get("/auth/google/callback", passport.authenticate("google"), (req, res) => {
        res.send("logged in")
    });
};

export default googleAuthRoutes;
