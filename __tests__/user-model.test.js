const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
// const sinon = require('sinon');
// require('sinon-mongoose');

const User = require('../models/user');

describe('User Model', () => {
  const user = User.schema.obj;

  const isNotTrimmed = /(^\s+\w|\w\s+$)/;

  describe('email', () => {
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

    it('fails when passed an invalid email', () => {
      const user = new User({
        username: 'someone',
        email: 'invalid email',
      });
      const err = user.validateSync();
      expect(err.errors.email).toBeDefined();
    });

    it('passes when a valid email is used', () => {
      const user = new User({
        username: 'someone',
        email: 'username@example.com',
      });
      const err = user.validateSync();
      expect(err).toBeUndefined();
    });

    it('is lowercased', () => {
      const user = new User({
        username: 'someone',
        email: 'USERNAME@EXAMPLE.COM',
      });
      expect(user.email).toEqual('username@example.com');
    });

    it('is trimmed', () => {
      const user = new User({
        username: 'someone',
        email: '  username@example.com  ',
      });
      expect(user.email.match(isNotTrimmed)).toBeFalsy();
    });
  });

  describe('username', () => {
    it('is required', () => {
      const user = new User({
        email: 'someone@example.com',
      });
      const err = user.validateSync();
      expect(err.errors.username).toBeDefined();
    });

    it('is unique', () => {
      expect(user.username.unique).toBe(true);
    });

    it('does not allow whitespace in between', () => {
      const user = new User({
        email: 'someone@example.com',
        username: ' asdf asdf',
      });
      const err = user.validateSync();
      expect(err.errors.username).toBeDefined();
    });

    it('trims whitespace', () => {
      const user = new User({
        email: 'someone@example.com',
        username: ' asdf_asdf ',
      });
      expect(user.username.match(isNotTrimmed)).toBeFalsy();
    });
  });

  describe('name', () => {
    it('is of type String', () => {
      expect(user.name.type).toBe(String);
    });

    it('trims whitespace', () => {
      const user = new User({
        email: 'someone@example.com',
        username: 'someone',
        name: '   John Doe   ',
      });
      expect(user.name.match(isNotTrimmed)).toBeFalsy();
    });

    it('fails on consecutive spaces', () => {
      const user = new User({
        email: 'someone@example.com',
        username: 'someone',
        name: 'John   Doe',
      });
      const err = user.validateSync();
      expect(err.errors.name).toBeDefined();
    });

    it('passes when separated by single spaces', () => {
      const user = new User({
        email: 'someone@example.com',
        username: 'someone',
        name: 'John Doe',
      });
      const err = user.validateSync();
      expect(err).toBeUndefined();
    });

    it('has maxlength of 70 chars', () => {
      expect(user.name.maxlength).toEqual(70);
    });
  });

  describe('initials', () => {
    it('is of type String', () => {
      expect(user.initials.type).toBe(String);
    });

    it('is converted to UpperCase', () => {
      const user = new User({
        username: 'someone',
        email: 'someone@example.com',
        initials: 'jda',
      });
      expect(user.initials).toBe('JDA');
    });

    it('must have at least 1 characters', () => {
      const user = new User({
        username: 'someone',
        email: 'someone@example.com',
        initials: '',
      });
      const err = user.validateSync();
      expect(err.errors.initials).toBeDefined();
    });

    it('cannot have more than 4 characters', () => {
      const user = new User({
        username: 'someone',
        email: 'someone@example.com',
        initials: 'someone',
      });
      const err = user.validateSync();
      expect(err.errors.initials).toBeDefined();
    });

    it('fails on whitespace', () => {
      const user = new User({
        username: 'someone',
        email: 'someone@example.com',
        initials: '  ',
      });
      const err = user.validateSync();
      expect(err.errors.initials).toBeDefined();

    });
  });

  describe('bio', () => {
    it('is of type String', () => {
      expect(user.bio.type).toBe(String);
    });

    it('is trimmed', () => {
      const user = new User({
        username: 'someone',
        email: 'someone@example.com',
        bio: ' This is my bio    ',
      });
      expect(user.bio.match(isNotTrimmed)).toBeFalsy();
    });

    it('is not empty', () => {
      const user = new User({
        username: 'someone',
        email: 'someone@example.com',
        bio: '',
      });
      const err = user.validateSync();
      expect(err.errors.bio).toBeDefined();
    });
  });

  describe('assigned_cards', () => {
    it('is an Array', () => {
      expect(user.assigned_cards).toBeInstanceOf(Array);
    });

    describe('obj', () => {
      const obj = user.assigned_cards[0];

      it('is of type ObjectId', () => {
        expect(obj.type).toBe(ObjectId);
      });

      it('is of ref Card', () => {
        expect(obj.ref).toBe('Card');
      });
    });
  });

  describe('boards', () => {
    it('is an Array', () => {
      expect(user.boards).toBeInstanceOf(Array);
    });

    describe('obj', () => {
      const obj = user.boards[0];

      describe('board', () => {
        const board = obj.board;
        it('is of type ObjectId', () => {
          expect(board.type).toBe(ObjectId);
        });

        it('is of ref Board', () => {
          expect(board.ref).toBe('Board');
        });
      });

      describe('favorite', () => {
        const favorite = obj.favorite;

        it('is of type Boolean', () => {
          expect(favorite.type).toBe(Boolean);
        });

        it('defaults to false', () => {
          expect(favorite.default).toBe(false);
        });
      });
    });
  });

  describe('teams', () => {
    it('is an Array', () => {
      expect(user.teams).toBeInstanceOf(Array);
    });

    describe('obj', () => {
      const obj = user.teams[0];

      it('is of type ObjectId', () => {
        expect(obj.type).toBe(ObjectId);
      });

      it('is of ref Team', () => {
        expect(obj.ref).toBe('Team');
      });
    });
  });

  describe('activity', () => {
    it('is of type ObjectId', () => {
      expect(user.activity.type).toBe(ObjectId);
    });

    it('is of ref Activity', () => {
      expect(user.activity.ref).toEqual('Activity');
    });
  });

  // describe('createUser method', () => {
  //   const UserMock = sinon.mock(User);

  //   it('is defined', () => {
  //     expect(User.createUser).toBeDefined();
  //   });

  //   it('throws error when invoked without arguments', () => {
  //     return User.createUser().catch(err => {
  //       expect(err).not.toBeNull();
  //     });
  //   });

  //   it('calls create with arguments', () => {
  //     UserMock.expects('create')
  //       .withArgs({ email: 'juandacorias@gmail.com', username: 'juandaco' })
  //       .chain('exec')
  //       .resolves('RESULT');

  //     return User.createUser('juandacorias@gmail.com', 'juandaco').then(
  //       result => {
  //         UserMock.verify();
  //         UserMock.restore();
  //         expect(result).toEqual('RESULT');
  //       },
  //     );
  //   });
  // });

  // describe('listUsers method', () => {
  //   it('calls find', () => {
  //     UserMock.expects('find')
  //       .chain('exec')
  //       .resolves('result');

  //     return User.listUsers().then(result => {
  //       UserMock.verify();
  //       UserMock.restore();
  //       expect(result).toEqual('result');
  //     });
  //   });
  // });
});

// describe('User Model Integration Tests', () => {
//   let db;
//   beforeAll(() => {
//     mongoose.connect('mongodb://localhost:27017/test');
//     db = mongoose.connection;
//   });

//   beforeEach(() => {
//     db.dropDatabase();
//   });

//   afterAll('User', User);
