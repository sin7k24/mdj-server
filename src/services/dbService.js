
const crypto = require("crypto");
const Database = require("better-sqlite3");
const db = new Database("db.sqlite3");

const ddl = `
    create table if not exists users( 
        id varchar(32) primary key, 
        password varchar(32), 
        savepath varchar(260)
    )
`;
db.prepare(ddl).run();

async function getUser(id, password) {
    console.log(id, password);
    const user = db.prepare("select * from users where id = ? and password = ?").get(id, password);
    console.log(user);
    return user;
}

async function addUser(user) {
    try {
        const hexPass = crypto.createHash("sha256").update(user.password).digest("hex");
        console.log("add user start. hexPass: ", hexPass);
        db.prepare("insert into users(id, password, savepath) values(?,?,?)").run(user.id, hexPass, user.savepath);
        console.log("INSERTRED");
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

module.exports = { getUser, addUser };