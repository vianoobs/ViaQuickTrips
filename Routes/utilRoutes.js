
const bodyParser = require("body-parser");
const express = require('express');

module.exports = app => {
    app.use(bodyParser.json());

// catch 404 and forward to error handler
    app.use(function (req, res, next) {
        let err = new Error('Not Found');
        err['status'] = 404;
        next(err);
    });
    if (process.env.NODE_ENV === "production"){
        // express will serve production assets ( main.js, main.css )
        // look inside client/build to serve assets
        app.use(express.static('client/build'));

        // express will serve index.html if it doesnt recognize route
        const path = require('path');
        app.get("*", (req, res) => {
            res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
        })
    }
};
