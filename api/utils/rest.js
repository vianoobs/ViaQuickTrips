"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const superagent_1 = __importDefault(require("superagent"));
class Rest {
    static get(url, accessToken) {
        return superagent_1.default
            .get(url)
            .set("Authorization", `bearer ${accessToken}`)
            .set("Accept", "application/json")
            .then(res => res.body).catch(err => {
            console.log(err);
            throw err;
        });
    }
}
exports.Rest = Rest;
//# sourceMappingURL=rest.js.map