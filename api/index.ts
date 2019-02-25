import express = require('express');
const app = express();
const cors = require('cors');
require('../models/User');
require('../models/Routes');
require('../services/passport');
require('../Services/routeServices');
const passport = require('passport');
const cookieSession = require('cookie-session');
const keys = require('../Config/config');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

//connecting to the db
mongoose.connect(keys.mongoURI, {useNewUrlParser: true})
    .catch(message => console.log(message));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.keys]
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => {
    let userOptions = {_id: user._id, googleId: user.googleId, firstName: user.firstName, lastName: user.lastName, displayName: user.displayName}
    done(null, userOptions);
});
passport.deserializeUser((userOptions, done) => {
    done(null, userOptions)
});













import routes from '../Routes/routes';
routes(app);



