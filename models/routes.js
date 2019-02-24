const mongoose = require('mongoose');
const { Schema } = mongoose;
// template for all user instances
const routesSchema = new Schema({
    googleId: String,
});
//creates users collection if not exists
mongoose.model("routes", routesSchema);
//# sourceMappingURL=routes.js.map