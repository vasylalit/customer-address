const express = require("express");
const bodyParser = require("body-parser");
const db = require("./model")
const serverConfig = require("./config/server.config")
const dbsource = require("./config/db.config")
// const {Client} = require("pg")

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//testing api
app.get('/', (req, res)=>{
    res.send({
        "message" : "Hello World"
    });
})

require("./route/auth.routes")(app);
require("./route/sync.routes")(app);
app.listen(serverConfig.PORT, () =>{
    console.log(`Server is listening on PORT ${serverConfig.PORT}`);
})