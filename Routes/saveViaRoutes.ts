
const bodyParams = requestBody => {
    return {

    }
};



const saveRoutes = app => {
    app.post("/save-search", (req, res) => {
        res.send("done")
    })
};
export default saveRoutes;