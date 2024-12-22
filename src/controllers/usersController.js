const fs = require("fs");

const utilityService = require('../services/utilityService');
const mdService = require('../services/mdService');
const dbService = require('../services/dbService');


async function get(req, res, next) {
    const id = req.query.id;
    const password = req.query.password;
    console.log(id, password);
    const user = await dbService.getUser(id, password);
    console.log(user);
    if (user) {
        res.status(200).send(user);
    } else {
        res.status(401).send("no user");
    }
}

async function put(req, res, next) {
    console.log(req.body);
    const ret = dbService.addUser(req.body);
    res.send("test");
}

module.exports = {
    get,
    put
};
