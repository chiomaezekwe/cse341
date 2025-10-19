jest.setTimeout(20000); // Increase to 20 seconds
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

const sampleReviewId = '68f4044a34d78f7fc2706254';

describe('Review Routes', () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('GET /api/reviews - should return all reviews', async () => {
    const res = await request(app).get('/api/reviews');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /api/reviews/:id - should return one or 404', async () => {
    const res = await request(app).get(`/api/reviews/${sampleReviewId}`);
    expect([200, 404]).toContain(res.statusCode);
  });
});
