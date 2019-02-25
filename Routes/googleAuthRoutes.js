"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require('passport');
const cors = require('cors');
const googleAuthRoutes = (app) => {
    // log users in
    app.get("/api/auth/google", passport.authenticate("google", {
        scope: ['email', 'profile']
    }));
    app.get("/auth/google/callback", passport.authenticate("google"), (req, res) => {
        res.redirect("/");
    });
    // request here on root mount to see if logged in
    app.options("/api/user", cors());
    app.get("/api/user", (req, res) => {
        console.log("this is the user");
        res.send(req.user);
    });
    // log users out
    app.get("/api/logout", (req, res) => {
        req.logout();
        res.send("done");
    });
};
exports.default = googleAuthRoutes;
//# sourceMappingURL=googleAuthRoutes.js.map