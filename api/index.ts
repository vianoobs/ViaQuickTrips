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



app.use(cors());
//connecting to the db
mongoose.connect(keys.mongoURI, {useNewUrlParser: true})
    .catch(message => console.log(message));
app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.keys]
}));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

import routes from '../Routes/routes';
routes(app);



