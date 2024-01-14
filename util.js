const fs = require("fs");
const readline = require("readline");
const { DIARY_ROOT } = require("./config");

class Util {
    static getDate(mdFileName) {
        let d = null;
        if (mdFileName) {
            const format =
                mdFileName.substring(1, 5) +
                "-" +
                mdFileName.substring(5, 7) +
                "-" +
                mdFileName.substring(7, 9);
            d = new Date(format);
        } else {
            d = new Date();
        }

        const year = d.getFullYear();
        const month = ("0" + (d.getMonth() + 1)).slice(-2);
        const day = ("0" + d.getDate()).slice(-2);
        // const dow = ["日", "月", "火", "水", "木", "金", "土"][date.getDay()];
        const dow = d.getDay();

        return { year: year, month: month, day: day, dow: dow };
    }

    static getDiaries(year, month) {
        let years = [];
        if (!year) {
            years = fs
                .readdirSync(DIARY_ROOT, { withFileTypes: true })
                .filter((f) => {
                    return f.isDirectory();
                })
                .map((f) => f.name);
        } else {
            years.push(year);
        }

        if (!month) {
            month = "";
        }

        let mdFiles = [];
        for (const y of years) {
            try {
                mdFiles = mdFiles.concat(
                    fs
                        .readdirSync(DIARY_ROOT + "/" + y, {
                            withFileTypes: true,
                        })
                        .filter((mdFile) => {
                            return mdFile.name.startsWith("d" + y + month);
                        })
                );
            } catch (e) {
                console.error(e);
                throw e;
            }
        }

        return mdFiles;
    }

    static grep(searchStr) {
        // get all diaries markdown
        const mdFiles = Util.getDiaries();

        for (const mdFile of mdFiles) {
            const date = Util.getDate(mdFile.name);
            const readStream = fs.createReadStream(
                DIARY_ROOT + "/" + date.year + "/" + mdFile.name,
                {
                    encoding: "utf8",
                }
            );
            const rl = readline.createInterface({ input: readStream });

            let lineIndex = 0;
            rl.on("line", (line) => {
                lineIndex++;

                if (line.search(searchStr) > -1) {
                    console.log(`${mdFile.name}: ${line}`);
                }
            });
        }
    }
}

module.exports = Util;
