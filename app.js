const express = require("express");
const marked = require("marked");
const fs = require("fs");
const util = require("./util");

const app = express();

// const DIARY_DIR = 'misc/dummy';
const DIARY_DIR = 'C://tmp/md/diary';
// const DIARY_DIR = "/Users/nakanishishingo/src/md/diary";

app.get("/", (req, res) => {
    date = util.getYYYYMMDD();
    res.redirect("/api/v1/md2html/" + date.yyyy + "/" + date.mm);
});

app.get("/api/v1/md2html/:year?/:month?", (req, res) => {
    console.log("hogehoge");
    let date = util.getYYYYMMDD();
    const year = req.params.year || date.yyyy;
    const month = req.params.month || date.mm;

    let mdFiles;
    try {
        mdFiles = fs
            .readdirSync(DIARY_DIR + "/" + year, { withFileTypes: true })
            .filter((mdFile) => {
                return mdFile.name.startsWith("d" + year + month);
            });
    } catch (e) {
        console.error(e);
        res.send(`<h1>diary not found. ${year}-${month}</h1>`);
        return;
    }

    let html = "";
    for (const mdFile of mdFiles) {
        date = util.getYYYYMMDD(mdFile.name);
        html += `<diary year="${date.yyyy}" month="${date.mm}" day="${date.dd}" dow="${date.dow}">`;
        const mdContent = fs.readFileSync(
            DIARY_DIR + "/" + year + "/" + mdFile.name,
            "utf-8"
        );
        html += marked.parse(mdContent) + "<hr/></diary>";
    }
    res.send(html);
});

app.get("/api/v1/years", (req, res) => {
    let years;
    try {
        years = fs
            .readdirSync(DIARY_DIR, { withFileTypes: true })
            .filter((f) => {
                return f.isDirectory();
            });
    } catch (e) {
        console.error(e);
        res.status(404).send("years not found");
        return;
    }

    let ret = {
        years: years.map((dirent) => dirent.name)
    };

    res.send(ret);
});


app.listen(3000, () => {
    console.log("Server listening on port 3000");
});
