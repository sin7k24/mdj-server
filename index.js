const express = require("express");
const marked = require("marked");
const fs = require("fs");

const app = express();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/diary", (req, res) => {
    const md = fs.readFileSync("d20231214.md", "utf-8");
    console.log(md);
    // const md = "#### ほげほげ\n" + 
    // "This is text with **markdown**";

    const html = marked.parse(md);
    console.log(html);
    res.send(html);
});

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});
