const fs = require("fs");
const { DIARY_ROOT } = require("../configs/config");

async function getDate(mdFileName) {
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

async function grep(searchStr, mdFiles) {
    const result = [];
    for (const mdFile of mdFiles) {
        const date = await getDate(mdFile.name);

        const mdContent = fs.readFileSync(
            DIARY_ROOT + "/" + date.year + "/" + mdFile.name,
            "utf-8"
        );

        const regexp = new RegExp(searchStr, "i");
        if (regexp.test(mdContent)) {
            const lines = mdContent
                .replace(new RegExp(/^\n/gm), "")
                .split("\n");

            let hitline = "";
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];

                if (line.search(regexp) > -1) {
                    hitline +=
                        (lines[i - 1] || "") + line + (lines[i + 1] || "");
                    break;
                }
            }
            const {year, month, day, dow} = await getDate(mdFile.name);
            result.push({
                year: year,
                month: month,
                day: day,
                dow: dow,
                file: mdFile.name,
                hitline: hitline,
            });
        }
    }

    return result;
}

module.exports = {
    getDate,
    grep
}