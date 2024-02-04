const express = require("express");
const marked = require("marked");
const fs = require("fs");
const Util = require("./util");
const { DIARY_ROOT } = require("./config");

const app = express();
app.use(express.json());

/**
 *
 */
app.get("/", (req, res) => {
    const date = Util.getYYYYMMDD();
    res.redirect("/api/v1/md2html/" + date.yyyy + "/" + date.mm);
});

/**
 *
 */
app.get("/api/v1/md2html/:year?/:month?", (req, res) => {
    console.log("hogehoge");
    let date = Util.getDate();
    const year = req.params.year || date.year;
    const month = req.params.month || date.month;

    let mdFiles;
    try {
        mdFiles = Util.getDiaries(year, month);
        if(mdFiles.length == 0) {
            res.status(404).send();
            return;
        }
    } catch (e) {
        console.error(e);
        res.send(`<h1>diary not found. ${year}-${month}</h1>`);
        return;
    }

    let html = "";
    for (const mdFile of mdFiles) {
        date = Util.getDate(mdFile.name);
        html += `<diary year="${date.year}" month="${date.month}" day="${date.day}" dow="${date.dow}">`;
        const mdContent = fs.readFileSync(
            DIARY_ROOT + "/" + year + "/" + mdFile.name,
            "utf-8"
        );
        // html += marked.parse(mdContent) + "<hr/></diary>";
        html += marked.parse(mdContent) + "</diary>";
    }
    res.send(html);
});

app.get("/api/v1/md/:year/:month/:day", (req, res) => {
    const year = req.params.year;
    const month = req.params.month;
    const day = req.params.day;

    console.log("md: ", year, month, day);
    const mdContent = Util.getMarkdownContent(year, month, day);

    res.send(mdContent);
});

app.post("/api/v1/md", (req, res) => {
    console.log(req.body);

    const year = req.body.year;
    const month = req.body.month;
    const day = req.body.day;
    const mdContent = req.body.mdContent;

    console.log("md: ", year, month, day, mdContent);
    // const mdContent = Util.getMarkdownContent(year, month, day);

    res.send("hoge");
});


/**
 *
 */
app.post("/api/v1/grep", (req, res) => {
    console.log(req.body.words);

    const result = Util.grep(req.body.words);
    console.log(result.length);
    res.send(result);
});

/**
 *
 */
app.get("/api/v1/years", (req, res) => {
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
});

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});
