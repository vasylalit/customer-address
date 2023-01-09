const database = require('../controller/database.controller');
const cors = require("cors")

module.exports = (app)=>{
    app.post('/sync/database', database.sync);
}