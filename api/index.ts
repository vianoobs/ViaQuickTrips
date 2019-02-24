import express = require('express');
import routes from '../Routes/routes'
const app = express();
require('../models/User');
require('../services/passport');
const keys = require('../Config/config');
const mongoose = require('mongoose');

//connecting to the db
mongoose.connect(keys.mongoURI, {useNewUrlParser: true})
    .catch(message => console.log(message));

routes(app);



