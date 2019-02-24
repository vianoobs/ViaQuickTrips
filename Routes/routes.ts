import apiRoutes from './apiRoutes';
import utilRoutes from './utilRoutes';

const routes = (app) => {
    // routes for api calls
    apiRoutes(app);

    // routes from util, token, and error handling
    utilRoutes(app);

    const port = process.env.port || 8081;
    app.listen(port, () => {
        console.log("Skynet is active on " + port);
    });

};

export default routes;