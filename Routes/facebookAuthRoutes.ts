const passport = require('passport');
import { keys } from'../Config/config'
const facebookAuthRoutes = (app) => {

    // log users in
    app.get("/auth/facebook", passport.authenticate("facebook"), () => {
        console.log("something")
        }
    );

    app.get("/auth/facebook/callback", passport.authenticate("facebook"), (req, res) => {
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

export default facebookAuthRoutes;
