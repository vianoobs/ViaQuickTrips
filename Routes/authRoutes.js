"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require('passport');
const authRoutes = (app) => {
    app.get("/api/auth/google", passport.authenticate("google", {
        scope: ['email', 'profile']
    }));
    app.get("/auth/google/callback", passport.authenticate("google"), (req, res) => {
        res.send("logged in");
    });
    app.get("/api/userman", (req, res) => {
        console.log("get loggin");
        res.send(req.user);
    });
    app.get("/api/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });
};
exports.default = authRoutes;
//# sourceMappingURL=authRoutes.js.map