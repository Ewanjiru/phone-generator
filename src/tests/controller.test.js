const request = require('supertest');
const fs = require('fs');
const sinon = require('sinon');

process.env.NODE_ENV = 'TEST';
describe('test phone generator controller', () => {
  beforeEach(() => {
    app = require('../../server');
  });

  afterAll(async () => {
    await app.close();
  });

  test('should return error if limit is above 10,000', (done) => {
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

  test('should generate phone numbers and write to file', (done) => {
    const total = {
      "totalPhoneNumbers": 2
    };
    const results = {
      Total: 2,
      phoneNumbers: ['0419994473', '0348982846']
    }
    return request(app)
      .post('/api/phoneNumbers')
      .send(total)
      .then((res, err) => {
        expect(res.status).toBe(201);
        done();
      })
  });

  test('should get all phone numbers', (done) => {
    return request(app)
      .get('/api/phoneNumbers')
      .then((res, err) => {
        expect(res.status).toBe(200);
        done();
      })
  })

  test('should get all phone numbers and sort them by asc', (done) => {
    return request(app)
      .get('/api/phoneNumbers?sort=asc')
      .then((res, err) => {
        expect(res.status).toBe(200);
        done();
      })
  })

  test('should get all phone numbers and sort them by desc', (done) => {
    return request(app)
      .get('/api/phoneNumbers?sort=desc')
      .then((res, err) => {
        expect(res.status).toBe(200);
        done();
      })
  })
});

