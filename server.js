const express = require("express");
const bodyParser = require("body-parser");
const db = require("./model")
const serverConfig = require("./config/server.config")
const dbsource = require("./config/db.config")
// const {Client} = require("pg")

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


// app.get('/postgres', async(req, res)=>{
//     const client = new Client({
//         host : "localhost",
//         user : "postgres",
//         port : 5432,
//         password : "lalit123",
//         database : "customeradd"
//     })
//     await client.connect();
    
//     // console.log("hello")
//     client.query(`SELECT * FROM customers JOIN address USING (customerID);`, (err, res)=>{
//         if(!err){
//             console.log(res.rows);
//         }else{
//             console.log(err.message);
//         }
//         client.end
//     })
// })


//testing api
app.get('/', (req, res)=>{
    res.send({
        "message" : "Hello World"
    });
})

require("./route/auth.routes")(app);
app.listen(serverConfig.PORT, () =>{
    console.log(`Server is listening on PORT ${serverConfig.PORT}`);
})