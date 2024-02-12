const fs = require("fs");
const marked = require("marked");

const mdService = require('./mdService');
const utilityService = require('./utilityService');
const { DIARY_ROOT } = require("../configs/config");

async function getMonthDiaryHtml(year, month) {
    let date = await utilityService.getDate();

    let mdFiles;
    try {
        mdFiles = await mdService.getMdFiles(year, month);
        if(mdFiles.length == 0) {
            // res.status(404).send();
            return;
        }
    } catch (e) {
        console.error(e);
        // res.send(`<h1>diary not found. ${year}-${month}</h1>`);
        return;
    }

    let html = "";
    for (const mdFile of mdFiles) {
        date = await utilityService.getDate(mdFile.name);
        html += `<diary year="${date.year}" month="${date.month}" day="${date.day}" dow="${date.dow}">`;
        const mdContent = fs.readFileSync(
            DIARY_ROOT + "/" + year + "/" + mdFile.name,
            "utf-8"
        );
        html += marked.parse(mdContent) + "</diary>";
    }

    return html;
}

module.exports = {
    getMonthDiaryHtml
}