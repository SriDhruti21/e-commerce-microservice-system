const request = require('supertest');
const app = require('../server');

describe('User Service API', () => {

    test('GET /users should return users list', async () => {
        const response = await request(app).get('/users');

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([
            { id: 1, name: "Alice" },
            { id: 2, name: "Bob" }
        ]);
    });

});
