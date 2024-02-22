const mdService = require("../../src/services/mdService");

describe("mdService", () => {
    test("getMarkdownContent() exists date", async () => {
        jest.spyOn(require("fs"), "readFileSync").mockImplementationOnce(() => {
            return "# test";
        });
        const content = await mdService.getMarkdownContent("2023", "12", "01");
        expect(content).not.toBeFalsy();
    });

    test("getMarkdownContent() not exists date", async () => {
        jest.spyOn(require("fs"), "readFileSync").mockImplementationOnce(() => {
            return "";
        });
        const content = await mdService.getMarkdownContent("2023", "12", "32");
        expect(content).toBeFalsy();
    });

    test("saveMarkdownContent() not exists date", async () => {
        jest.spyOn(require("fs"), "writeFileSync").mockImplementationOnce(
            () => {}
        );
        await mdService.saveMarkdownContent("2023", "11", "01", "Jestテスト８");
    });
});
