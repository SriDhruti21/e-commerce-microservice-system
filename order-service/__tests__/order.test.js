const request = require("supertest");
const axios = require("axios");
const app = require("../server");

jest.mock("axios");

describe("Order Service Tests", () => {

    test("GET /orders - Success", async () => {
        axios.get.mockResolvedValue({
            data: [{ id: 1, name: "Alice" }]
        });

        const res = await request(app).get("/orders");

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Order service is running");
        expect(res.body.users).toEqual([{ id: 1, name: "Alice" }]);
    });

    test("GET /orders - Failure", async () => {
        axios.get.mockRejectedValue(new Error("Service down"));

        const res = await request(app).get("/orders");

        expect(res.statusCode).toBe(500);
        expect(res.body.error).toBe("Unable to fetch users");
    });

});
