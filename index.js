const express = require('express');
const app = express();
const cors = require('cors');
require('./models/User');
require('./models/Routes');
require('./Services/passportService');
const passport = require('passport');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const keys = require('./Config/dev');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");


app.use(cors());
//connecting to the db
mongoose.connect(keys.mongoURI, {useNewUrlParser: true})
    .catch(message => console.log(message));
app.use(cookieParser());
app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.keys]
}));
passport.serializeUser((user, done) => {
    let userOptions = {userId: user.userId, firstName: user.firstName, lastName: user.lastName, displayName: user.displayName}
    done(null, userOptions);
});
passport.deserializeUser((userOptions, done) => {
    done(null, userOptions)
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

require('./Routes/rootRoutes')(app);




