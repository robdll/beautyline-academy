const request = require('supertest');
const app = require('../server');
const dbHandler = require('./dbHandler');

describe('Product CRUD Integration Tests', () => {
    let testUser = {
        name: "Product Tester",
        email: `tester_${Date.now()}@example.com`,
        password: "password123",
        role: "admin"
    };
    let authToken = "";
    let testProduct = {
        name: "Integration Test Product " + Date.now(),
        description: "Testing product CRUD flows",
        price: 150.00,
        category: "test-category",
        subCategory: "test-subcategory",
        subSubCategory: "test-subsubcategory",
        stock: 50,
        brand: "TestBrand",
        image: "https://example.com/test-prod.jpg"
    };
    let productId = "";

    beforeAll(async () => {
        await dbHandler.connect();
        const bcrypt = require('bcrypt');
        const User = require('../model/userDB.model');

        const hashedPassword = await bcrypt.hash(testUser.password, 10);
        await User.create({ ...testUser, password: hashedPassword });

        const loginRes = await request(app).post('/api/login').send({
            email: testUser.email,
            password: testUser.password
        });
        authToken = loginRes.body.token;
    });

    afterAll(async () => {
        await dbHandler.closeDatabase();
    });

    describe('Access Control', () => {
        test('Should return 401 for unauthorized product creation', async () => {
            const res = await request(app).post('/api/product').send(testProduct);
            expect(res.status).toBe(401);
        });
    });
    describe('Product Creation', () => {
        test('Should return 400 for missing required fields (Zod validation)', async () => {
            const res = await request(app)
                .post('/api/product')
                .set('Authorization', `Bearer ${authToken}`)
                .send({ ...testProduct, name: "" });

            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty('errors');
        });
        test('Should successfully create a product', async () => {
            const res = await request(app)
                .post('/api/product')
                .set('Authorization', `Bearer ${authToken}`)
                .send(testProduct);

            expect(res.status).toBe(201);
            expect(res.body.name).toBe(testProduct.name.toLowerCase());
            expect(res.body.subSubCategory).toBe(testProduct.subSubCategory.toLowerCase());
            productId = res.body._id;
        });
        test('Should return 409 for duplicate product name', async () => {
            const res = await request(app)
                .post('/api/product')
                .set('Authorization', `Bearer ${authToken}`)
                .send(testProduct);

            expect(res.status).toBe(409);
        });
    });
    describe('Product Retrieval', () => {
        test('Should get all products', async () => {
            const res = await request(app).get('/api/product');
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });

        test('Should get product by ID', async () => {
            const res = await request(app).get(`/api/product/${productId}`);
            expect(res.status).toBe(200);
            expect(res.body._id).toBe(productId);
        });
        test('Should return 404 for non-existent product ID', async () => {
            const mongoose = require('mongoose');
            const fakeId = new mongoose.Types.ObjectId();
            const res = await request(app).get(`/api/product/${fakeId}`);
            expect(res.status).toBe(404);
        });
        test('Should return 400 for invalid product ID format', async () => {
            const res = await request(app).get('/api/product/invalid-id');
            expect(res.status).toBe(400);
        });
    });
    describe('Product Updates', () => {
        test('Should successfully update a product', async () => {
            const updatedStock = 100;
            const res = await request(app)
                .put(`/api/product/${productId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({ stock: updatedStock });

            expect(res.status).toBe(200);
            expect(res.body.stock).toBe(updatedStock);
        });
        test('Should reject updates with invalid data types', async () => {
            const res = await request(app)
                .put(`/api/product/${productId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({ price: "not-a-number" });

            expect(res.status).toBe(400);
        });
    });
    describe('Product Deletion', () => {
        test('Should successfully delete a product', async () => {
            const res = await request(app)
                .delete(`/api/product/${productId}`)
                .set('Authorization', `Bearer ${authToken}`);

            expect(res.status).toBe(200);
        });

        test('Should return 404 for deleting non-existent product', async () => {
            const res = await request(app)
                .delete(`/api/product/${productId}`)
                .set('Authorization', `Bearer ${authToken}`);

            expect(res.status).toBe(404);
        });
    });
});
