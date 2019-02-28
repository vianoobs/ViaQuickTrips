const superagent = require("superagent");
const express = require('express');
const keys = require('../Config/config')

//helper functions
const paramReturn = reqParamObject => {
    return {
        term: reqParamObject["term"] || null,
        latitude: reqParamObject["lat"] || "29.424122",
        longitude: reqParamObject["long"] || "-98.493629",
        radius: "8000",
        categories: reqParamObject["categories"] || null,
        price: reqParamObject["price"] || "1,2,3,4"
    }
};

module.exports = app => {

    // ------- yelp ---------------
    // ----------------------------
    app.post('/api/yelp', (req, res) => {
        superagent
            .get("https://api.yelp.com/v3/businesses/search")
            .set("Authorization", `bearer ${keys.yelpApi}`)
            .query(paramReturn(req.body))
            .then(yelpRes => {
                res.send(JSON.parse(yelpRes.text));
            })
            .catch(error => console.log(error));
    });

    // ------- google maps / directions ---------------
    // ------------------------------------------------
    app.post("/api/maps", (req, res) => {
        const currentLocation = `${req.body.currentLat},${req.body.currentLong}`;
        superagent
            .get(`https://maps.googleapis.com/maps/api/directions/json?origin=${currentLocation}&destination=${req.body.destination}&mode=transit&key=${keys.googleApi}`)
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
