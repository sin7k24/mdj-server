const fs = require("fs");
const readline = require("readline");

const DIARY_DIR = "C://tmp/md/diary";

module.exports = {
    getYYYYMMDD: (mdFileName) => {
        let date = null;
        if (mdFileName) {
            const format =
                mdFileName.substring(1, 5) +
                "-" +
                mdFileName.substring(5, 7) +
                "-" +
                mdFileName.substring(7, 9);
            date = new Date(format);
        } else {
            date = new Date();
        }

        const yyyy = date.getFullYear();
        const mm = ("0" + (date.getMonth() + 1)).slice(-2);
        const dd = ("0" + date.getDate()).slice(-2);
        const dow = ["日", "月", "火", "水", "木", "金", "土"][date.getDay()];

        return { yyyy: yyyy, mm: mm, dd: dd, dow: dow };
    },
    grep: (str) => {
        let mdFiles;
        try {
            mdFiles = fs
                .readdirSync(DIARY_DIR + "/" + 2023, { withFileTypes: true })
                .filter((mdFile) => {
                    return mdFile.name.startsWith("d" + "202305");
                });
        } catch (e) {
            console.error(e);
            // res.send(`<h1>diary not found. ${year}-${month}</h1>`);
            return;
        }

        for (const mdFile of mdFiles) {
            const readStream = fs.createReadStream(
                DIARY_DIR + "/" + 2023 + "/" + mdFile.name,
                {
                    encoding: "utf8",
                }
            );
            const rl = readline.createInterface({ input: readStream });

            let lineIndex = 0;
            rl.on("line", (line) => {
                lineIndex++;

                if (line.search(str) > -1) {
                    console.log(`${mdFile.name}: ${line}`);
                }
            });
        }
    },
};
