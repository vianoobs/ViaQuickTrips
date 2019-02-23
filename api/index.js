"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const superagent_1 = __importDefault(require("superagent"));
const bodyParser = require("body-parser");
const axios = require('axios');
const app = express();
const cors = require('cors');
const yelpApi = require("../Config/config.js");
let accessToken;
app.use(function (req, res, next) {
    // console.log('Time:', Date.now());
    // Check req obj for any needed headers
    const token = req.header('access_token');
    if (token && token.length > 1) {
        accessToken = token;
        res.setHeader('access_token', accessToken);
        next();
    }
    else {
        const authBody = {
            'client_id': '466c8f34-e2af-42bb-87c2-4802206168f7',
            'client_secret': 'islsiVY6tCzezyBOHkkiMEXK7Nq07mCyj3MurrvzdYU=',
            'Resource': '2cd2fb9a-18c2-4eb1-931b-8885c6151548',
            'grant_type': 'client_credentials'
        };
        const url = 'https://login.microsoftonline.com/2a3033c2-ad76-426c-9c5a-23233cde4cde/oauth2/token';
        superagent_1.default
            .post(url)
            .type("form")
            .send(authBody).then(authRes => {
            const body = authRes.body;
            accessToken = body.access_token;
            res.setHeader('access_token', accessToken);
            next();
        }).catch(err => {
            console.log(err);
        });
    }
});
app.use(cors());
app.use(bodyParser.json());
//  Routes ----------------------------------------------
app.post('/api/yelp', (req, res) => {
    // console.log(JSON.stringify(req.body));
    const reqParamObject = paramReturn(req.body);
    superagent_1.default
        .get("https://api.yelp.com/v3/businesses/search")
        .set("Authorization", `bearer ${yelpApi.yelpApi}`)
        .query(reqParamObject)
        .then(yelpRes => res.send(JSON.parse(yelpRes.text)))
        .catch(error => console.log(error));
});
app.get("/api/all-routes/", (req, res) => {
    superagent_1.default
        .get("https://codegtfsapi.viainfo.net/api/v1/routes")
        .set("Authorization", `bearer ${accessToken}`)
        .set("Accept", "application/json")
        .then(response => {
        console.log("response: here");
        res.send(JSON.parse(response.text)["result"]);
    }).catch(err => {
        console.log("error");
        res.send(err);
        console.log(err);
    });
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
//helper functions
const paramReturn = reqParamObject => {
    return {
        latitude: reqParamObject["lat"] || "29.424122",
        longitude: reqParamObject["long"] || "-98.493629",
        radius: "8000",
        category: reqParamObject["category"] || null,
        price: reqParamObject["price"] || "4"
    };
};
const port = process.env.port || 8080;
app.listen(port, () => {
    console.log("Skynet is active on " + port);
});
//# sourceMappingURL=index.js.map