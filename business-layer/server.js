const express = require("express");
const bodyParser = require("body-parser");
const db = require("./model")
const serverConfig = require("./config/server.config")
const dbsource = require("./config/db.config")
const cors = require("cors")


const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors({
    origin: '*',
    // methods: ["GET", "POST"]
}));

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