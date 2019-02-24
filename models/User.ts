const mongoose = require('mongoose');
const { Schema } = mongoose;

// template for all user instances
const userSchema = new Schema({
    googleId: String,
    firstName: String,
    lastName: String,
    displayName: String
});

//creates users collection if not exists
mongoose.model("users", userSchema);