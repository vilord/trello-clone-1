const sinon = require('sinon');
require('sinon-mongoose');


describe('Mongoose User Model', () => {
  const User = require('../models/user');
  const UserMock = sinon.mock(User);

  it('test', done => {
    UserMock.expects('find')
      .withArgs({ username: 'juandaco' })
      .chain('exec')
      .resolves('RESULT');

    User.findByUsername('juandaco').then(function(result) {
      UserMock.verify();
      UserMock.restore();
      expect(result).toEqual('RESULT');
      done();
    });
  });
});
