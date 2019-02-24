"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const Route = mongoose.model('routes');
const routeMethods = {
    saveSearchedRoute: payload => {
        Route.findOne()
            .then(() => {
            new Route({
                owner: payload.owner,
                name: payload.name,
                address: payload.address,
            }).save()
                .catch(err => console.log(err));
        });
    }
};
exports.default = routeMethods;
//# sourceMappingURL=routeServices.js.map