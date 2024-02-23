// const {describe, test, expect} = require('jest');
const request = require("supertest");
const app = require("../../src/app");

describe("mdController", () => {
    test("It should response the GET method", (done) => {
        request(app)
            .get("/api/v1/md/2023/12/01")
            .then((response) => {
                expect(response.statusCode).toBe(200);
                done();
            });
    });
});
