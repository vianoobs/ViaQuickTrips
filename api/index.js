"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
app.get('/hello', (req, res) => {
    res.send('Hello from the project root!');
});
app.get('*', (req, res) => {
    res.send('Nothing to see here!' + process.env);
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res) => {
        res.status(err['status'] || 500);
        res.send({
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: {}
    });
});
app.set('port', process.env.port || 8080);
// @ts-ignore
app.listen();
