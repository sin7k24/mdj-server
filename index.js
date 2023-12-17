const express = require("express");
const marked = require("marked");

const app = express();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/diary", (req, res) => {
    // const md = `
    // #### ほげほげ
    // This is text with **markdown**
    // `;

//    const md = "This is text with **markdown**";
    const md = `#### ほげほげ 
    This is text with **markdown**`;

    const html = marked.parseInline(md);
    console.log(html);
    res.send(html);
});

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});
