import express = require('express');
import routes from '../Routes/routes'
const passport = require('passport');
const cookieSession = require('cookie-session');
const app = express();
require('../models/User');
require('../services/passport');
const keys = require('../Config/config');
const mongoose = require('mongoose');

//connecting to the db
mongoose.connect(keys.mongoURI, {useNewUrlParser: true})
    .catch(message => console.log(message));

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.keys]
}));

app.use(passport.initialize());
app.use(passport.session());
routes(app);


