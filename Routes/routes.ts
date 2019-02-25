import apiRoutes from './apiRoutes';
import googleAuthRoutes from './googleAuthRoutes';
import facebookRoutes from './facebookAuthRoutes';
import saveRoutes from './saveViaRoutes';
import utilRoutes from './utilRoutes';

const routes = (app) => {


    // routes for api calls
    apiRoutes(app);

    // auth routes
    googleAuthRoutes(app);
    facebookRoutes(app);

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