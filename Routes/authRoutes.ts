const passport = require('passport');
import bodyParser = require("body-parser");
let urlencodedParser = bodyParser.urlencoded({extended: false});

const authRoutes = (app) => {

    app.get("/api/auth/google", passport.authenticate("google", {
        scope: ['email', 'profile']
    }));

    app.get("/auth/google/callback", passport.authenticate("google"), (req, res) => {
        res.redirect("/")
    });

    app.get("/api/user", (req, res) => {
        res.send(req.user)
    });

    app.get("/api/logout", (req, res) => {
        req.logout();
        res.redirect("/")
    });
};

export default authRoutes;
