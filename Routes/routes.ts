import apiRoutes from './apiRoutes';
import authRoutes from './authRoutes';
import saveRoutes from './saveViaRoutes';
import utilRoutes from './utilRoutes';

const bodyParser = require("body-parser");

const routes = (app) => {
    app.use(bodyParser.json());

    // routes for api calls
    apiRoutes(app);

    // auth routes
    authRoutes(app);

    // saving previously searched routes
    saveRoutes(app);

    // routes from util, token, and error handling
    utilRoutes(app);

    const port = process.env.port || 8081;
    app.listen(port, () => {
        console.log("Skynet is active on " + port);
    });

};

export default routes;