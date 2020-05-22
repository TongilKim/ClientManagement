const proxy = require("http-proxy-middleware");

module.exports = function (app) {
    //If you want to set up the all url that start with 'api' in port 5000 then just use below.
    //app.use(proxy("/api", { target: "http://localhost:5000" }));

    // Local
    // app.use(proxy("/api/customers", { target: "http://localhost:5000" })); 

    // Deploy 
    app.use(proxy("/api/customers", { target: "https://clientmanagement-server.herokuapp.com/" }));
};