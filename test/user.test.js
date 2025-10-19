jest.setTimeout(20000); // Increase to 20 seconds
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

const sampleUserId = '68f4909d64e2a2b982feb2c5'; 

describe('User Routes', () => {
  test('GET /api/users - should return 401 if not authenticated', async () => {
  const res = await request(app).get('/api/users');
  expect(res.statusCode).toBe(401); 
});

  test('GET /api/users/:id - should return 401 if not authenticated', async () => {
  const res = await request(app).get(`/api/users/${sampleUserId}`);
  expect(res.statusCode).toBe(401); 
});
});
