const fs = require("fs");
const { DIARY_ROOT } = require("../configs/config");

const md2HtmlService = require('../services/md2HtmlService');
const utilityService = require('../services/utilityService');

async function get(req, res, next) {
    let years;
    try {
        years = fs
            .readdirSync(DIARY_ROOT, { withFileTypes: true })
            .filter((f) => {
                return f.isDirectory();
            });
    } catch (e) {
        console.error(e);
        res.status(404).send("years not found");
        return;
    }

    let ret = {
        years: years.map((dirent) => dirent.name),
    };

    res.send(ret);
}

module.exports = {
    get
};
