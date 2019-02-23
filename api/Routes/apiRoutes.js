"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const superagent_1 = __importDefault(require("superagent"));
const express = require("express");
const app = express();
const tokenGetter = require('./tokenGetter');
app.get("/api/all-routes/", (req, res) => {
    superagent_1.default
        .get("https://codegtfsapi.viainfo.net/api/v1/routes")
        .set("Authorization", `bearer ${tokenGetter.token}`)
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
//# sourceMappingURL=apiRoutes.js.map