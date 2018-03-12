const request = require('supertest');
const nock = require('nock');
const app = require('../app.js');

describe('Basic route', () => {
  it('should run', () => {
    nock('http://localhost')
      .post('/api/users/1234')
      .reply(200, {
        message: 'user1234',
      });

    request(app)
      .post('/api/users/1234')
      .expect(200)
      .end((err, res) => {
        expect(err).toBeNull();
        expect(res.body.message).toEqual('user1234');
      });
  });
});
