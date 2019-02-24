"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const superagent_1 = __importDefault(require("superagent"));
const config_js_1 = require("../Config/config.js");
let accessToken;
//helper functions
const paramReturn = reqParamObject => {
    return {
        term: reqParamObject["term"] || null,
        latitude: reqParamObject["lat"] || "29.424122",
        longitude: reqParamObject["long"] || "-98.493629",
        radius: "8000",
        categories: reqParamObject["categories"] || null,
        price: reqParamObject["price"] || "1,2,3,4"
    };
};
const apiRoutes = app => {
    app.post('/api/yelp', (req, res) => {
        superagent_1.default
            .get("https://api.yelp.com/v3/businesses/search")
            .set("Authorization", `bearer ${config_js_1.yelpApi}`)
            .query(paramReturn(req.body))
            .set("Authorization", `bearer ${config_js_1.yelpApi}`)
            .then(yelpRes => {
            res.send(JSON.parse(yelpRes.text));
        })
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
    app.post("/api/maps", (req, res) => {
        console.log(req.body);
        const currentLocation = `${req.body.currentLat},${req.body.currentLong}`;
        superagent_1.default
            .get(`https://maps.googleapis.com/maps/api/directions/json?origin=${currentLocation}&destination=${req.body.destination}&mode=transit&key=${config_js_1.googleApi}`)
            .then(googleRes => {
            const jsonResponse = JSON.parse(googleRes.text);
            // if transit routes are found
            if (jsonResponse["routes"].length !== 0) {
                res.send(JSON.parse(googleRes.text)["routes"][0]["legs"]);
            }
            else {
                res.send(JSON.parse(googleRes.text));
            }
        });
    });
};
exports.default = apiRoutes;
//# sourceMappingURL=apiRoutes.js.map