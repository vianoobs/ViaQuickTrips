const mongoose = require('mongoose');
const { Schema } = mongoose;

// template for all user instances
const userSchema = new Schema({
    userId: String,
    firstName: String,
    lastName: String,
    displayName: String,
    provider: String
});

//creates users collection if not exists
mongoose.model("users", userSchema);