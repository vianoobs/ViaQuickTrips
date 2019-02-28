
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
};
