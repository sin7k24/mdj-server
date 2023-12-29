const express = require("express");
const marked = require("marked");
const fs = require("fs");
const util = require("./util");

const app = express();

// const DIARY_DIR = 'misc/dummy';
const DIARY_DIR = 'C://tmp/md/diary';

app.get("/", (req, res) => {
    date = util.getYYYYMMDD();
    res.redirect("/diary/" + date.yyyy + "/" + date.mm);
});

app.get("/diary/:year?/:month?", (req, res) => {
    let date = util.getYYYYMMDD();
    const year = req.params.year || date.yyyy;
    const month = req.params.month || date.mm;

    const mdFiles = fs.readdirSync(DIARY_DIR + "/" + year, { withFileTypes: true}).filter((mdFile) => {
        return mdFile.name.startsWith("d" + year + month);
    });

    let html = "";
    for (const mdFile of mdFiles) {
        date = util.getYYYYMMDD(mdFile.name);
        html += `<h1>${date.yyyy}年${date.mm}月${date.dd}日（${date.day}）</h1>`
        const mdContent = fs.readFileSync(DIARY_DIR + "/" + year + "/" + mdFile.name, "utf-8");
        html += marked.parse(mdContent) + "<hr/>";            
    }
    res.send(html);
});

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});
