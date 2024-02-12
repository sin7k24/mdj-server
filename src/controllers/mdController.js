const mdService = require('../services/mdService');

async function get(req, res, next) {
    const year = req.params.year;
    const month = req.params.month;
    const day = req.params.day;

    console.log("md: ", year, month, day);
    const mdContent = await mdService.getMarkdownContent(year, month, day);
    console.log(mdContent);

    res.send(mdContent);
}

async function post(req, res, next) {
    const year = req.body.year;
    const month = req.body.month;
    const day = req.body.day;
    const mdContent = req.body.mdContent;

    console.log("md: ", year, month, day, mdContent);

    await mdService.saveMarkdownContent(year, month, day, mdContent);

    res.status(200).send();
}

module.exports = {
    get,
    post
};
