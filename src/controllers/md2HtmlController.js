const md2HtmlService = require('../services/md2HtmlService');
const utilityService = require('../services/utilityService');

async function get(req, res, next) {
    const date = await utilityService.getDate();
    const year = req.params.year || date.year;
    const month = req.params.month || date.month;

    const html = await md2HtmlService.getMonthDiaryHtml(year, month);
    res.send(html);
}

module.exports = {
    get
};
