const request = require('supertest');
const fs = require('fs');
const sinon = require('sinon');
const app = require('../../server');

describe('test phone generator controller', () => {
  test('should return error if limit is above 10,000', async (done) => {
    const total = {
      "totalPhoneNumbers": 1000000
    };
    return request(app)
      .post('/api/phoneNumbers')
      .send(total)
      .then((res, err) => {
        expect(res.status).toBe(400);
        expect(res.text).toBe('{\"message\":\"Number of generated phone numbers should be between 1 to 10000\"}')
        done();
      })
  });

  test('should generate phone numbers and write to file', async (done) => {
    const total = {
      "totalPhoneNumbers": 2
    };
    return request(app)
      .post('/api/phoneNumbers')
      .send(total)
      .then((res, err) => {
        expect(res.status).toBe(201);
        done();
      })
  });

  test('should get all phone numbers', async (done) => {
    return request(app)
      .get('/api/phoneNumbers')
      .then((res, err) => {
        expect(res.status).toBe(200);
        done();
      })
  })

  test('should get all phone numbers and sort them by asc', async (done) => {
    return request(app)
      .get('/api/phoneNumbers?sort=asc')
      .then((res, err) => {
        expect(res.status).toBe(200);
        done();
      })
  })

  test('should get all phone numbers and sort them by desc', async (done) => {
    return request(app)
      .get('/api/phoneNumbers?sort=desc')
      .then((res, err) => {
        expect(res.status).toBe(200);
        done();
      })
  })
});
