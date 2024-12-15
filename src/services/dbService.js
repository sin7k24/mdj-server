const sqlite3 = require("sqlite3");
const fs = require("fs");

const db = new sqlite3.Database("./db.sqlite3", (err) => {
    if (err) {
        console.error("database error: " + err.message);
    } else {
        db.serialize(() => {
            db.run("create table if not exists users( \
                id integer primary key autoincrement, \
                password nverchar(32), \
                savepath nverchar(128) \
            )", (err) => {
                if (err) {
                    console.error("table error: " + err.message);
                } else {
                    // db.run("insert into users(id,password,savedir) values(?,?,?)", "naka", "hoge#111", "/Users/nakanishishingo/src/md");
                }
            });
        });
    }
});

async function initialize() {
}


module.exports = { initialize };