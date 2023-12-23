const express = require("express");
const marked = require("marked");
const fs = require("fs");

const app = express();

const DIR = 'misc/dummy';

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/diary/:year?/:month?", (req, res) => {
    const year = req.params.year;
    const month = req.params.month;
console.log("aaabbb");
    console.log(year, month);
    const md = fs.readFileSync(DIR + "/" + year + "/" + "/d20231223.md", "utf-8");
    const html = marked.parse(md);
    res.send(html);
});

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});
