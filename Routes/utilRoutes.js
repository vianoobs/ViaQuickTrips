"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const superagent_1 = __importDefault(require("superagent"));
const ViaTrip_1 = require("../api/logic/ViaTrip");
const cors = require('cors');
const bodyParser = require("body-parser");
let accessToken;
const utilRoutes = app => {
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
    app.get('/test', (req, res) => {
        const source = { lat: '29.427839', lon: '-98.494636' };
        const destination = { lat: '29.424525', lon: '-98.487076' };
        const viaTrip = new ViaTrip_1.ViaTrip(source, destination, 'https://codegtfsapi.viainfo.net', accessToken);
        viaTrip.findCloseStops(3, viaTrip.sourceLocation).then(response => {
            res.send(response);
        }).catch(err => {
            res.send(err);
        });
    });
    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        let err = new Error('Not Found');
        err['status'] = 404;
        next(err);
    });
};
exports.default = utilRoutes;
//# sourceMappingURL=utilRoutes.js.map