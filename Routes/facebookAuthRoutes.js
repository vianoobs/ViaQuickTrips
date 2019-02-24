"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require('passport');
const facebookAuthRoutes = (app) => {
    // log users in
    app.get("/auth/facebook", passport.authenticate("facebook"));
    app.get("/auth/facebook/callback", passport.authenticate("facebook"), (req, res) => {
        res.send("logged in");
    });
    // request here on root mount to see if logged in
    app.get("/api/user", (req, res) => {
        res.send(req.user);
    });
    // log users out
    app.get("/api/logout", (req, res) => {
        req.logout();
        res.send("done");
    });
};
exports.default = facebookAuthRoutes;
//# sourceMappingURL=facebookAuthRoutes.js.map