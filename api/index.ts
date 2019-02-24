import express = require('express');
const app = express();
const passport = require('passport');
const cookieSession = require('cookie-session');
require('../models/User');
require('../models/Routes');
require('../services/passport');
require('../Services/routeServices');
const keys = require('../Config/config');
const mongoose = require('mongoose');
import routes from '../Routes/routes';


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


