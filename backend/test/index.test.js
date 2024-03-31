import { describe, it } from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import app from '../src/app.js';

// Verify access to the homepage when starting the backend application
describe('GET /', () => {
  it('should return homepage with 200 status code', async () => {
    const response = await request(app).get('/');
    assert.strictEqual(response.status, 200);
  });
});

// Tests for the '/api/info' endpoint
describe('GET /api/info', () => {
  // Verify that country information for "fr" is returned successfully
  it('should return country information for "fr"', async () => {
    const response = await request(app).get('/api/info?codes=fr');
    assert.strictEqual(response.status, 200);
  });

  // Verify that an error is returned for an invalid country code
  it('should return error for invalid country code', async () => {
    const response = await request(app).get('/api/info?codes=azaze');
    assert.strictEqual(response.status, 500);
  });
});

// Tests for the '/api/news' endpoint
describe('GET /api/news', () => {
  // Verify that news for "fr" is returned successfully
  it('should return news for "fr"', async () => {
    const response = await request(app).get('/api/news?country=fr');
    assert.strictEqual(response.status, 200);
  });

  // Verify that an error is returned for an invalid country code
  it('should return error for invalid country code', async () => {
    const response = await request(app).get('/api/news?country=ahze');
    assert.strictEqual(response.status, 400);
  });
});

