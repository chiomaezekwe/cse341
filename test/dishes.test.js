jest.setTimeout(20000); // Increase to 20 seconds
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

const sampleDishId = '68f4044a34d78f7fc2706250'; // Replace

describe('Dish Routes', () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('GET /api/dishes - should return all dishes', async () => {
    const res = await request(app).get('/api/dishes');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /api/dishes/:id - should return a dish or 404', async () => {
    const res = await request(app).get(`/api/dishes/${sampleDishId}`);
    expect([200, 404]).toContain(res.statusCode);
  });
});
