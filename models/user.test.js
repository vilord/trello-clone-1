const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
// const sinon = require('sinon');
// require('sinon-mongoose');

const User = require('./user');

const genValidUser = () => ({
  username: 'johndoe',
  name: 'John Doe',
  email: 'johndoe@example.com',
  password: 'abcABC123',
  google_id: 12345,
});

describe('User Model', () => {
  const user = User.schema.obj;

  let validUser;
  beforeEach(() => {
    validUser = genValidUser();
  });

  describe('username', () => {
    const { username } = user;

    it('is required', () => {
      delete validUser.username;
      const user = new User(validUser);
      const err = user.validateSync();
      expect(err.errors.username).toBeDefined();
    });

    it('is unique', () => {
      expect(username.unique).toBe(true);
    });

    it('does not allow whitespace in between', () => {
      validUser.username = 'john   doe';
      const user = new User(validUser);
      const err = user.validateSync();
      expect(err.errors.username).toBeDefined();
    });

    it('is trimmed', () => {
      expect(username.trim).toBe(true);
    });
  });

  describe('password', () => {
    const { password } = user;

    it('is of type String', () => {
      expect(password.type).toBe(String);
    });

    it('is encrypted', () => {
      expect(password.bcrypt).toBe(true);
    });

    it('is required when google_id not present', () => {
      delete validUser.password;
      delete validUser.google_id;
      const user = new User(validUser);
      const err = user.validateSync();
      expect(err.errors.password).toBeDefined();
    });

    it('is not required when google_id present', () => {
      delete validUser.password;
      const user = new User(validUser);
      const err = user.validateSync();
      expect(err).toBeUndefined();
    });
  });

  describe('google_id', () => {
    const { google_id } = user;

    it('is of type Number', () => {
      expect(google_id.type).toBe(Number);
    });

    it('is required when password not present', () => {
      delete validUser.google_id;
      delete validUser.password;
      const user = new User(validUser);
      const err = user.validateSync();
      expect(err.errors.google_id).toBeDefined();
    });

    it('is not required when password present', () => {
      delete validUser.google_id;
      const user = new User(validUser);
      const err = user.validateSync();
      expect(err).toBeUndefined();
    });
  });

  describe('email', () => {
    const { email } = user;

    it('is required', () => {
      delete validUser.email;
      const user = new User(validUser);
      const err = user.validateSync();
      expect(err.errors.email).toBeDefined();
    });

    it('is unique', () => {
      expect(email.unique).toBe(true);
    });

    it('fails when invalid email', () => {
      validUser.email = 'invalid email';
      const user = new User(validUser);
      const err = user.validateSync();
      expect(err.errors.email).toBeDefined();
    });

    it('passes when valid email', () => {
      const user = new User(validUser);
      const err = user.validateSync();
      expect(err).toBeUndefined();
    });

    it('is lowercased', () => {
      expect(email.lowercase).toBe(true);
    });

    it('is trimmed', () => {
      expect(email.trim).toBe(true);
    });
  });

  describe('name', () => {
    const { name } = user;

    it('is of type String', () => {
      expect(name.type).toBe(String);
    });

    it('is required', () => {
      expect(name.required).toBe(true);
    });

    it('trims whitespace', () => {
      expect(name.trim).toBe(true);
    });

    it('fails on consecutive spaces', () => {
      validUser.name = ' Invalid  Spaced  Name';
      const user = new User(validUser);
      const err = user.validateSync();
      expect(err.errors.name).toBeDefined();
    });

    it('passes when separated by single spaces', () => {
      const user = new User(validUser);
      const err = user.validateSync();
      expect(err).toBeUndefined();
    });

    it('has maxlength of 70 chars', () => {
      expect(name.maxlength).toBe(70);
    });
  });

  describe('initials', () => {
    const { initials } = user;

    it('is of type String', () => {
      expect(initials.type).toBe(String);
    });

    it('is converted to UpperCase', () => {
      expect(initials.uppercase).toBe(true);
    });

    it('must have at least 1 characters', () => {
      expect(initials.minlength).toBe(1);
    });

    it('cannot have more than 4 characters', () => {
      expect(initials.maxlength).toBe(4);
    });

    it('fails on whitespace', () => {
      validUser.initials = ' J D ';
      const user = new User(validUser);
      const err = user.validateSync();
      expect(err.errors.initials).toBeDefined();
    });
  });

  describe('bio', () => {
    const { bio } = user;

    it('is of type String', () => {
      expect(bio.type).toBe(String);
    });

    it('is trimmed', () => {
      expect(bio.trim).toBe(true);
    });

    it('is not empty', () => {
      validUser.bio = '';
      const user = new User(validUser);
      const err = user.validateSync();
      expect(err.errors.bio).toBeDefined();
    });
  });

  describe('avatar', () => {
    const { avatar } = user;

    it('is of type String', () => {
      expect(avatar.type).toBe(String);
    });

    it('is trimmed', () => {
      expect(avatar.trim).toBe(true);
    });

    it('fails with an invalid url', () => {
      validUser.avatar = 'invalid URL';
      const user = new User(validUser);
      const err = user.validateSync();
      expect(err.errors.avatar).toBeDefined();
    });

    it('passes with a valid url', () => {
      const user = new User(validUser);
      const err = user.validateSync();
      expect(err).toBeUndefined();
    });
  });

  describe('assigned_cards', () => {
    const { assigned_cards } = user;

    it('is an Array', () => {
      expect(assigned_cards).toBeInstanceOf(Array);
    });

    describe('obj', () => {
      const obj = assigned_cards[0];

      it('is of type ObjectId', () => {
        expect(obj.type).toBe(ObjectId);
      });

      it('is of ref Card', () => {
        expect(obj.ref).toBe('Card');
      });
    });
  });

  describe('boards', () => {
    const { boards } = user;

    it('is an Array', () => {
      expect(boards).toBeInstanceOf(Array);
    });

    describe('obj', () => {
      const obj = boards[0];

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
    it('is an Array', () => {
      expect(user.activity).toBeInstanceOf(Array);
    });

    describe('obj', () => {
      const obj = user.activity[0];
      it('is of type ObjectId', () => {
        expect(obj.type).toBe(ObjectId);
      });

      it('is of ref Activity', () => {
        expect(obj.ref).toBe('Activity');
      });
    });
  });

  // describe('createUser method', () => {
  //   const UserMock = sinon.mock(User);

  //   it('is defined', () => {
  //     expect(User.createUser).toBeDefined();
  //   });

  //   it('throws error when invoked without arguments', () => {
  //     return User.createUser(validUser);.catch(err => {
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
  //         expect(result).toBe('RESULT');
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
  //       expect(result).toBe('result');
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
