import express = require('express');
import routes from '../Routes/routes'
const app = express();

routes(app);