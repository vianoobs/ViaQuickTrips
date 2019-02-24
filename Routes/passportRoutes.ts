const cookieSession = require('cookie-session');
const passport = require('passport');
import { keys } from'../Config/config'

const passportApp = app => {

// setting up cookies - 30 days
    app.use(cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    }));

    app.use(passport.initialize());
    app.use(passport.session());
};

export default passportApp;