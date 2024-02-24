const fs = require("fs");


async function post(req, res, next) {
    console.log(req.body);
    console.log(req.body.name);
    console.log(req.file);
    console.log('imgController#post called.');
    res.send("OK");
}

module.exports = {
    post
};
