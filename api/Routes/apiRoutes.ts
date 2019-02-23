import superagent from "superagent";
import express = require('express');
const app = express();
const tokenGetter = require('./tokenGetter');

app.get("/api/all-routes/", (req: express.Request, res: express.Response) => {
    superagent
        .get("https://codegtfsapi.viainfo.net/api/v1/routes")
        .set("Authorization", `bearer ${tokenGetter.token}`)
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