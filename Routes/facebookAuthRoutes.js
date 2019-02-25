"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require('passport');
const facebookAuthRoutes = (app) => {
    // log users in
    app.get("/auth/facebook", passport.authenticate("facebook"));
    app.get("/auth/facebook/callback", passport.authenticate("facebook"), (req, res) => {
        res.send("logged in");
    });
};
exports.default = facebookAuthRoutes;
//# sourceMappingURL=facebookAuthRoutes.js.map