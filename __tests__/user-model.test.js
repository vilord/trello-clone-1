// const mongoose = require('mongoose');
const sinon = require('sinon');
require('sinon-mongoose');

const User = require('../models/user');
const UserMock = sinon.mock(User);

describe('User Model', () => {
  describe('fields', () => {
    const user = User.schema.obj;

    it('has email', () => {
      expect(user.email).toBeDefined();
    });

    it('requires an email', () => {
      const user = new User();
      const err = user.validateSync();
      expect(err.errors.email).toBeDefined();
    });

    it('email is unique', () => {
      expect(user.email.unique).toBe(true);
    });

    it('has username', () => {
      expect(user.username).toBeDefined();
    });

    it('requires username', () => {
      const user = new User();
      const err = user.validateSync();
      expect(err.errors.username).toBeDefined();
    });

    it('username is unique', () => {
      expect(user.username.unique).toBe(true);
    });

    it('has name', () => {
      expect(user.name).toBeDefined();
    });

    it.skip('has boards', () => {
      expect(user.boards).toBeDefined();
    });
  });

  describe('createUser method', () => {
    it('is defined', () => {
      expect(User.createUser).toBeDefined();
    });

    it('throws error when invoked without arguments', () => {
      return User.createUser().catch(err => {
        expect(err).not.toBeNull();
      });
    });

    it('calls create with arguments', () => {
      UserMock.expects('create')
        .withArgs({ email: 'juandacorias@gmail.com', username: 'juandaco' })
        .chain('exec')
        .resolves('RESULT');

      return User.createUser('juandacorias@gmail.com', 'juandaco').then(
        result => {
          UserMock.verify();
          UserMock.restore();
          expect(result).toEqual('RESULT');
        },
      );
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
