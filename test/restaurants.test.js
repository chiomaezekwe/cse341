jest.setTimeout(20000); // Increase to 20 seconds
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

const sampleRestaurantId = '68f4044a34d78f7fc270624a';

describe('Restaurant Routes', () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('GET /api/restaurants - should return all restaurants', async () => {
    const res = await request(app).get('/api/restaurants');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /api/restaurants/:id - should return one or 404', async () => {
    const res = await request(app).get(`/api/restaurants/${sampleRestaurantId}`);
    expect([200, 404]).toContain(res.statusCode);
  });
});
