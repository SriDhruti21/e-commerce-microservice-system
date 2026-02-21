const request = require("supertest");
const axios = require("axios");
const app = require("../server");

jest.mock("axios");

describe("Order Service Test Cases", () => {

    beforeEach(() => {
        axios.get.mockResolvedValue({
            data: [{ id: 1, name: "Alice" }]
        });
    });

    test("1. GET /orders returns 200", async () => {
        const res = await request(app).get("/orders");
        expect(res.statusCode).toBe(200);
    });

    test("2. Response contains correct message", async () => {
        const res = await request(app).get("/orders");
        expect(res.body.message).toBe("Order service is running");
    });

    test("3. Users should be an array", async () => {
        const res = await request(app).get("/orders");
        expect(Array.isArray(res.body.users)).toBe(true);
    });

    test("4. Users array should not be empty", async () => {
        const res = await request(app).get("/orders");
        expect(res.body.users.length).toBeGreaterThan(0);
    });

    test("5. User object contains id", async () => {
        const res = await request(app).get("/orders");
        expect(res.body.users[0]).toHaveProperty("id");
    });

    test("6. User object contains name", async () => {
        const res = await request(app).get("/orders");
        expect(res.body.users[0]).toHaveProperty("name");
    });

    test("7. Axios should be called once", async () => {
        await request(app).get("/orders");
        expect(axios.get).toHaveBeenCalledTimes(1);
    });

    test("8. Axios called with correct URL", async () => {
        await request(app).get("/orders");
        expect(axios.get).toHaveBeenCalledWith("http://user-service:3001/users");
    });

    test("9. Failure should return 500", async () => {
        axios.get.mockRejectedValueOnce(new Error("Service down"));
        const res = await request(app).get("/orders");
        expect(res.statusCode).toBe(500);
    });

    test("10. Invalid route returns 404", async () => {
        const res = await request(app).get("/invalid");
        expect(res.statusCode).toBe(404);
    });

});
