// const request = require('supertest');
// const app = require('../app.js');

const nock = require('nock');
const axios = require('axios');

describe('Basic route', () => {
  const host = 'http://localhost';

  it('POST /api/users/:id', () => {
    const apiRoute = '/api/users/1234';
    nock(host)
      .post(apiRoute)
      .reply(200, {
        message: 'user1234',
      });

    return axios.post(host + apiRoute).then(res => {
      expect(res.status).toEqual(200);
      expect(res.data).toEqual({
        message: 'user1234',
      });
    });
  });
});
