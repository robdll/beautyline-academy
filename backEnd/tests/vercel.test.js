const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

describe('Beautyline Academy - Full Suite Integration Tests', () => {
    let testUser = {
        name: "Test User",
        email: `test_${Date.now()}@example.com`,
        password: "password123"
    };
    let authToken = "";

    const originalSecret = process.env.JWT_SECRET;

    beforeAll(async () => {

        await new Promise(resolve => setTimeout(resolve, 1000));
    });

    afterAll(async () => {
        if (mongoose.connection.readyState !== 0) {
            await mongoose.connection.close();
        }
        process.env.JWT_SECRET = originalSecret;
    }, 20000);

    describe('Environment & Configuration', () => {
        test('Authentication should fail gracefully without JWT_SECRET', async () => {
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
            delete process.env.JWT_SECRET;
            const response = await request(app)
                .get('/api/user')
                .set('Authorization', 'Bearer dummy');
            expect(response.status).toBe(500);
            process.env.JWT_SECRET = originalSecret;
            consoleSpy.mockRestore();
        });
    });

    describe('User Validation (Zod)', () => {
        test('Should return 400 for invalid email (Bug 3 validation)', async () => {
            const response = await request(app)
                .post('/api/user')
                .send({ ...testUser, email: "invalid-email" });

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('errors');
            expect(response.body.errors[0].field).toBe('email');
        });
    });

    describe('User CRUD & Auth Flow', () => {
        test('Step 1: Create a new user', async () => {
            const response = await request(app)
                .post('/api/user')
                .send(testUser);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('_id');
            expect(response.body.email).toBe(testUser.email);
            expect(response.body).not.toHaveProperty('password');
        });

        test('Step 2: Login with the new user', async () => {
            const response = await request(app)
                .post('/api/login')
                .send({
                    email: testUser.email,
                    password: testUser.password
                });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('token');
            authToken = response.body.token;
        });

        test('Step 3: Access protected route /user', async () => {
            const response = await request(app)
                .get('/api/user')
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });

        test('Step 4: Protect route without token', async () => {
            const response = await request(app).get('/api/user');
            expect(response.status).toBe(401);
        });
    });
});
