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
        res.status(401).send("User not found");
    }
}

async function post(req, res, next) {
    console.log(req.body);
    const ret = await dbService.addUser(req.body);
    if(ret) {
        res.status(201).send("created user");
    }else{
        res.status(500).send("failed to create user");
    }
}

module.exports = {
    get,
    post
};
