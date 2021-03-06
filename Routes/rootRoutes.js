module.exports = (app) => {

    // routes for api calls
    require('./apiRoutes')(app);

    // auth routes
    require('./googleAuthRoutes')(app);
    require('./facebookAuthRoutes')(app);

    // saving previously searched routes
    require('./viaRoutes')(app);

    // routes from util, token, and error handling
    require('./utilRoutes')(app);
};