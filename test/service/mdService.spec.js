const mdService = require("../../src/services/mdService");

describe("mdService", () => {
    test("getMarkdownContent() exists date", async () => {
        const content = await mdService.getMarkdownContent("2023", "12", "01");
        expect(content).not.toBeFalsy();
    });

    test("getMarkdownContent() not exists date", async () => {
        const content = await mdService.getMarkdownContent("2023", "12", "32");
        expect(content).toBeFalsy();
    });

    test("saveMarkdownContent() not exists date", async () => {
        // jest.mock('fs');
        jest.spyOn(require("fs"), "writeFileSync").mockImplementationOnce(
            () => {
                console.log("fs.writeFileSync was mocked.");
            }
        );
        // fs.writeFileSync.mockResolveValue();
        await mdService.saveMarkdownContent("2023", "11", "01", "Jestテスト８");
        // expect(content).toBeFalsy();
    });
});
