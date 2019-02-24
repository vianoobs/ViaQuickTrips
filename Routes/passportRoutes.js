"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cookieSession = require('cookie-session');
const passport = require('passport');
const config_1 = require("../Config/config");
const passportApp = app => {
    // setting up cookies - 30 days
    app.use(cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [config_1.keys.cookieKey]
    }));
    app.use(passport.initialize());
    app.use(passport.session());
};
exports.default = passportApp;
//# sourceMappingURL=passportRoutes.js.map