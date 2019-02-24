"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const routes_1 = __importDefault(require("../Routes/routes"));
const app = express();
require('../models/User');
require('../services/passport');
const keys = require('../Config/config');
const mongoose = require('mongoose');
//connecting to the db
mongoose.connect(keys.mongoURI, { useNewUrlParser: true })
    .catch(message => console.log(message));
routes_1.default(app);
//# sourceMappingURL=index.js.map