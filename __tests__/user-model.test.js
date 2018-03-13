// const mongoose = require('mongoose');
const sinon = require('sinon');
require('sinon-mongoose');

const User = require('../models/user');
const UserMock = sinon.mock(User);

describe('User Model', () => {
  describe('createUser method', () => {
    it('exists', () => {
      expect(User.createUser).toBeDefined();
    });

    it('throws error when invoked without arguments', () => {
      return User.createUser().catch(err => {
        expect(err).not.toBeNull();
      });
    });

    it('calls create with arguments', () => {
      UserMock.expects('create')
        .withArgs({ name: 'Juan', username: 'juandaco' })
        .chain('exec')
        .resolves('RESULT');

      return User.createUser('Juan', 'juandaco').then(result => {
        UserMock.verify();
        UserMock.restore();
        expect(result).toEqual('RESULT');
      });
    });
  });

  describe('listUsers method', () => {
    it('exists', () => {
      expect(User.listUsers).toBeDefined();
    });

    it('calls find', () => {
      UserMock.expects('find')
        .chain('exec')
        .resolves('result');

      return User.listUsers().then(result => {
        UserMock.verify();
        UserMock.restore();
        expect(result).toEqual('result');
      });
    });
  });
});

// describe('Mongoose User Model', () => {
//   let db;
//   beforeAll(() => {
//     mongoose.connect('mongodb://localhost:27017/test');
//     db = mongoose.connection;
//   });

//   beforeEach(() => {
//     db.dropDatabase();
//   });

//   afterAll(() => {
//     db.close();
//   });

//   it('Lists all users', async () => {
//     await Promise.all([
//       User.createUser('Juan D. Acosta', 'juandaco'),
//       User.createUser('Pepito Perez', 'pepito'),
//     ]);
//     const users = await User.listUsers();
//     expect(users.length).toEqual(2);
//     expect(users[0].username).toEqual('juandaco');
//     expect(users[1].username).toEqual('pepito');
//   });
// });
