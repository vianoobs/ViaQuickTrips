"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiRoutes_1 = __importDefault(require("./apiRoutes"));
const utilRoutes_1 = __importDefault(require("./utilRoutes"));
const routes = (app) => {
    // routes for api calls
    apiRoutes_1.default(app);
    // routes from util, token, and error handling
    utilRoutes_1.default(app);
    const port = process.env.port || 8081;
    app.listen(port, () => {
        console.log("Skynet is active on " + port);
    });
};
exports.default = routes;
//# sourceMappingURL=routes.js.map