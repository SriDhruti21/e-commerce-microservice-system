const request = require("supertest");
const app = require("../server");

describe("User Service - Test Cases", () => {

    test("1. GET /users returns 200", async () => {
        const res = await request(app).get("/users");
        expect(res.statusCode).toBe(200);
    });

    test("2. Response should be an array", async () => {
        const res = await request(app).get("/users");
        expect(Array.isArray(res.body)).toBe(true);
    });

    test("3. Users array should not be empty", async () => {
        const res = await request(app).get("/users");
        expect(res.body.length).toBeGreaterThan(0);
    });

    test("4. User object should contain id", async () => {
        const res = await request(app).get("/users");
        expect(res.body[0]).toHaveProperty("id");
    });

    test("5. User object should contain name", async () => {
        const res = await request(app).get("/users");
        expect(res.body[0]).toHaveProperty("name");
    });

    test("6. id should be a number", async () => {
        const res = await request(app).get("/users");
        expect(typeof res.body[0].id).toBe("number");
    });

    test("7. name should be a string", async () => {
        const res = await request(app).get("/users");
        expect(typeof res.body[0].name).toBe("string");
    });

    test("8. Content-Type should be JSON", async () => {
        const res = await request(app).get("/users");
        expect(res.headers["content-type"]).toMatch(/json/);
    });

    test("9. Invalid route should return 404", async () => {
        const res = await request(app).get("/invalid");
        expect(res.statusCode).toBe(404);
    });

    test("10. Status should not be 500", async () => {
        const res = await request(app).get("/users");
        expect(res.statusCode).not.toBe(500);
    });

});
