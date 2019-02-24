import superagent from "superagent";
import express = require('express');
import { yelpApi, googleApi } from '../Config/config.js';

let accessToken;

//helper functions
const paramReturn = reqParamObject => {
    return {
        term: reqParamObject["term"] || null,
        latitude: reqParamObject["lat"] || "29.424122",
        longitude: reqParamObject["long"] || "-98.493629",
        radius: "160000",
        categories: reqParamObject["categories"] || null,
        price: reqParamObject["price"] || "1,2,3,4"
    }
};

const apiRoutes = app => {

    // ------- yelp ---------------
    // ----------------------------
    app.post('/api/yelp', (req: express.Request, res: express.Response) => {
        superagent
            .get("https://api.yelp.com/v3/businesses/search")
            .set("Authorization", `bearer ${yelpApi}`)
            .query(paramReturn(req.body))
            .set("Authorization", `bearer ${yelpApi}`)
            .then(yelpRes => {
                res.send(JSON.parse(yelpRes.text));
            })
            .catch(error => console.log(error));
    });

    // ------- via all routes ---------------
    // ----------------------------
    app.get("/api/all-routes/", (req: express.Request, res: express.Response) => {
        superagent
            .get("https://codegtfsapi.viainfo.net/api/v1/routes")
            .set("Authorization", `bearer ${accessToken}`)
            .set("Accept", "application/json")
            .then(response => {
                console.log("response: here");
                res.send(JSON.parse(response.text)["result"]);
            }).catch(err => {
            console.log("error");
            res.send(err);
            console.log(err)
        });
    });

    // ------- google maps / directions ---------------
    // ------------------------------------------------
    app.post("/api/maps", (req, res) => {
        const currentLocation = `${req.body.currentLat},${req.body.currentLong}`;
        superagent
            .get(`https://maps.googleapis.com/maps/api/directions/json?origin=${currentLocation}&destination=${req.body.destination}&mode=transit&key=${googleApi}`)
            .then(googleRes => {
                const jsonResponse = JSON.parse(googleRes.text);
                // if transit routes are found
                if (jsonResponse["routes"].length !== 0) {
                    res.send(JSON.parse(googleRes.text)["routes"][0]["legs"]);
                } else {
                    res.send(JSON.parse(googleRes.text))
                }
            });
    });
};

export default apiRoutes;