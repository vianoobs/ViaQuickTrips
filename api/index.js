"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
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
mongoose.connect(keys.mongoURI, { useNewUrlParser: true })
    .catch(message => console.log(message));
app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.keys]
}));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
const routes_1 = __importDefault(require("../Routes/routes"));
routes_1.default(app);
//# sourceMappingURL=index.js.map