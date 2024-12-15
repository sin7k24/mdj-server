const fs = require("fs");

const utilityService = require('../services/utilityService');
const mdService = require('../services/mdService');
const dbService = require('../services/dbService');


async function get(req, res, next) {
    if(fs.existsSync("./db.sqlite3")){
        res.send("");
    }else{
        res.status(404).send("nodbfile");
    }
}

async function put(req, res, next) {
    console.log(req.body);
    const ret = dbService.initialize();
    res.send("test");
}

module.exports = {
    get,
    put
};
