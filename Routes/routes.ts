import apiRoutes from './apiRoutes';
import utilRoutes from './utilRoutes';
import passportApp from './passportRoutes';
import authRoutes from './authRoutes';
const bodyParser = require("body-parser");

const routes = (app) => {
    app.use(bodyParser.json());

    // routes for api calls
    apiRoutes(app);

    // routes from util, token, and error handling
    utilRoutes(app);

    // passport app
    passportApp(app);

    // auth routes
    authRoutes(app);

    const port = process.env.port || 8081;
    app.listen(port, () => {
        console.log("Skynet is active on " + port);
    });

};

export default routes;