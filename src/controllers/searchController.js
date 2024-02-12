const utilityService = require('../services/utilityService');
const mdService = require('../services/mdService');

async function post(req, res, next) {
    console.log(req.body.words);
    const mdFiles = await mdService.getMdFiles();
    const result = await utilityService.grep(req.body.words, mdFiles);
    console.log(result.length);
    res.send(result);
}

module.exports = {
    post
};
