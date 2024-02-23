const fs = require("fs");


async function post(req, res, next) {
    console.log('imgController#post called.');
    res.send(200);
}

module.exports = {
    post
};
