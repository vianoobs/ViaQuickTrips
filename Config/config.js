// determines which set of API Keys to use, based on whether or not the site is in production

if(process.env.NODE_ENV === "production"){
    module.exports = require('./productionKeys');
} else {
    module.exports = require('./dev');
}