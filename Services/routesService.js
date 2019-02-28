const mongoose = require('mongoose');
const Route = mongoose.model('routes');

module.exports = {
    saveSearchedRoute: payload => {
        Route.findOne()
            .then(() => {
                new Route({
                    owner: payload.owner,
                    name: payload.name,
                    address: payload.address,
                }).save()
                    .catch(err => console.log(err))
            })
    }
};
