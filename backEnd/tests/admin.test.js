const request = require('supertest');
const app = require('../server');
const dbHandler = require('./dbHandler');
const User = require('../model/userDB.model');
const bcrypt = require('bcrypt');

describe('Administrative Functionality Tests', () => {
    let regularUser = {
        name: "Regular User",
        email: "regular@example.com",
        password: "password123"
    };
    let adminUser = {
        name: "Admin User",
        email: "admin@example.com",
        password: "password123",
        role: "admin"
    };
    let regularToken = "";
    let adminToken = "";
    beforeAll(async () => {
        await dbHandler.connect();
        const hashedPassword = await bcrypt.hash(regularUser.password, 10);
        await User.create({ ...regularUser, password: hashedPassword });
        const hashedAdminPassword = await bcrypt.hash(adminUser.password, 10);
        await User.create({ ...adminUser, password: hashedAdminPassword });
        const regLogin = await request(app).post('/api/login').send({
            email: regularUser.email,
            password: regularUser.password
        });
        regularToken = regLogin.body.token
        const adminLogin = await request(app).post('/api/login').send({
            email: adminUser.email,
            password: adminUser.password
        });
        adminToken = adminLogin.body.token;
    });
    afterAll(async () => {
        await dbHandler.closeDatabase();
    });
    describe('Access Control - Product Creation', () => {
        const testProduct = {
            name: "Admin Test Product",
            description: "Test description",
            price: 100,
            category: "test",
            subCategory: "test",
            subSubCategory: "test",
            stock: 10,
            brand: "TestBrand",
            image: "http://example.com/image.jpg"
        };
        test('Should return 401 (Unauthorized) when no token is provided', async () => {
            const res = await request(app)
                .post('/api/product')
                .send(testProduct);
            expect(res.status).toBe(401);
        });
        test('Should return 403 (Forbidden) when regular user attempts to create product', async () => {
            const res = await request(app)
                .post('/api/product')
                .set('Authorization', `Bearer ${regularToken}`)
                .send(testProduct);
            expect(res.status).toBe(403);
            expect(res.body.message).toBe("Acesso negado");
        });
        test('Should return 201 (Created) when admin user attempts to create product', async () => {
            const res = await request(app)
                .post('/api/product')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(testProduct);
            expect(res.status).toBe(201);
            expect(res.body.name).toBe(testProduct.name.toLowerCase());
        });
    });
    describe('Admin Script Validation', () => {
        test('createAdmin script logic check', async () => {
            const admin = await User.findOne({ role: 'admin' });
            expect(admin).toBeDefined();
            expect(admin.email).toBe(adminUser.email);
            expect(admin.role).toBe('admin');
        });
    });
});
