const passport = require('passport');
const googleAuthRoutes = (app) => {

    // log users in
    app.get("/api/auth/google", passport.authenticate("google", {
        scope: ['email', 'profile']
    }));

    app.get("/auth/google/callback", passport.authenticate("google"), (req, res) => {
        res.send("logged in")
    });

    // request here on root mount to see if logged in
    app.get("/api/user", (req, res) => {
        res.send(req.user)
    });

    // log users out
    app.get("/api/logout", (req, res) => {
        req.logout();
        res.redirect("/")
    });
};

export default googleAuthRoutes;
