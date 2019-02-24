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
                    .catch(err => console.log(err))
            })
    }
};

export default routeMethods;