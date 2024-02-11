const md2HtmlService = require('../services/md2HtmlService');
const Util = require('../utils/util');

async function get(req, res, next) {
    console.log("HHOGEHOGEHOGE");
    let date = Util.getDate();
    const year = req.params.year || date.year;
    const month = req.params.month || date.month;

    const html = await md2HtmlService.getMonthDiaryHtml(year, month);
    console.log(html);
    res.send(html);
}

module.exports = {
    get
};
