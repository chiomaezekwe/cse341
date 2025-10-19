jest.setTimeout(20000); // Increase to 20 seconds
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

const sampleCommentId = '68f4044a34d78f7fc2706258';

describe('Comment Routes', () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('GET /api/comments - should return all comments', async () => {
    const res = await request(app).get('/api/comments');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /api/comments/:id - should return one or 404', async () => {
    const res = await request(app).get(`/api/comments/${sampleCommentId}`);
    expect([200, 404]).toContain(res.statusCode);
  });
});
