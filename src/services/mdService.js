const fs = require("fs");
const { DIARY_ROOT } = require("../configs/config");

async function getMdFiles(year, month) {
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

async function getMarkdownContent(year, month, day) {
    const mdPath = `${DIARY_ROOT}/${year}/d${year}${month}${day}.md`;
    return fs.existsSync(mdPath) ? fs.readFileSync(mdPath) : "";
}

async function saveMarkdownContent(year, month, day, mdContent) {
    const mdPath = `${DIARY_ROOT}/${year}/d${year}${month}${day}.md`;
    fs.writeFileSync(mdPath, mdContent);
}

module.exports = {
    getMdFiles,
    getMarkdownContent,
    saveMarkdownContent
}