const passport = require('passport');

import { keys } from'../Config/config'

const authRoutes = (app) => {

    app.get("/api/auth/google", passport.authenticate("google", {
        scope: ['email', 'profile']
    }));

    app.get("/auth/google/callback", passport.authenticate("google"), (req, res) => {
        res.send("logged in")
    });

    app.get("/api/userman", (req, res) => {
        console.log("get loggin");
        res.send(req.user)
    });

    app.get("/api/logout", (req, res) => {
        req.logout();
        res.redirect("/")
    });


};

export default authRoutes;
