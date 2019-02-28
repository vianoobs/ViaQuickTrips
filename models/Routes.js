const mongoose = require('mongoose');
const { Schema } = mongoose;

// template for all user instances
const routesSchema = new Schema({
    owner: String,
    name: String,
    address: String,
    imageURL: String,
    URL: String,
    googleURL: String,
});

//creates users collection if not exists
mongoose.model("routes", routesSchema);