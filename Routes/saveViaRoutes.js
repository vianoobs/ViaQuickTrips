"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParams = requestBody => {
    return {};
};
const saveRoutes = app => {
    app.post("/save-search", (req, res) => {
        res.send("done");
    });
};
exports.default = saveRoutes;
//# sourceMappingURL=saveViaRoutes.js.map