const Team = require('../models/team');
const User = require('../models/user');
const { ObjectId } = require('mongoose').Schema.Types;

describe('Team Model', () => {
  const team = Team.schema.obj;

  describe('name', () => {
    it('is of type String', () => {
      expect(team.name.type).toBe(String);
    });

    it('is required', () => {
      const team = new Team();
      const err = team.validateSync();
      expect(err.errors.name).toBeDefined();
    });
  });

  describe('shortname', () => {
    it('is of type String', () => {
      expect(team.shortname.type).toBe(String);
    });

    it('is required', () => {
      const team = new Team({
        name: 'some name',
        members: [
          {
            user: new User({
              username: 'some username',
              email: 'some@email.com',
            }),
            admin: true,
          },
        ],
      });
      const err = team.validateSync();
      expect(err.errors.shortname).toBeDefined();
    });

    it('fails when its length is less than 3 characters', () => {
      const team = new Team({
        name: 'some name',
        shortname: 'af',
        members: [
          {
            user: new User({
              username: 'some username',
              email: 'some@email.com',
            }),
            admin: true,
          },
        ],
      });
      const err = team.validateSync();
      expect(err.errors.shortname).toBeDefined();
    });

    it('passes when its length is 3 or more characters', () => {
      const team = new Team({
        name: 'some name',
        shortname: 'aaa',
        members: [
          {
            user: new User({
              username: 'someone',
              email: 'some@email.com',
            }),
            admin: true,
          },
        ],
      });
      const err = team.validateSync();
      expect(err).toBeUndefined();
    });

    it('is unique', () => {
      expect(team.shortname.unique).toEqual(true);
    });
  });

  describe('website', () => {
    it('is of type String', () => {
      expect(team.website.type).toBe(String);
    });

    it('fails without a valid URL', () => {
      const team = new Team({
        name: 'some name',
        shortname: 'some shortname',
        website: 'invalid URL',
        members: [
          {
            user: new User({
              username: 'some username',
              email: 'some@email.com',
            }),
            admin: true,
          },
        ],
      });
      const err = team.validateSync();
      expect(err.errors.website).toBeDefined();
    });

    it('passes with a valid URL', () => {
      const team = new Team({
        name: 'some name',
        shortname: 'some shortname',
        website: 'http://example.com',
        members: [
          {
            user: new User({
              username: 'someone',
              email: 'some@email.com',
            }),
            admin: true,
          },
        ],
      });
      const err = team.validateSync();
      expect(err).toBeUndefined();
    });
  });

  describe('description', () => {
    it('is of type String', () => {
      expect(team.description.type).toBe(String);
    });
  });

  describe('boards', () => {
    it('is an Array', () => {
      expect(team.boards).toBeInstanceOf(Array);
    });

    describe('obj', () => {
      const obj = team.boards[0];

      it('is of type ObjectId', () => {
        expect(obj.type).toBe(ObjectId);
      });

      it('is of ref Board', () => {
        expect(obj.ref).toEqual('Board');
      });
    });
  });

  describe('members', () => {
    it('is an Array', () => {
      expect(team.members.type).toBeInstanceOf(Array);
    });

    describe('obj', () => {
      const obj = team.members.type[0];

      describe('user', () => {
        const user = obj.user;
        it('is of type ObjectId', () => {
          expect(user.type).toBe(ObjectId);
        });

        it('is of ref User', () => {
          expect(user.ref).toEqual('User');
        });
      });

      describe('adim', () => {
        const admin = obj.admin;
        it('is of type Boolean', () => {
          expect(admin.type).toBe(Boolean);
        });

        it('defaults to false', () => {
          expect(admin.default).toEqual(false);
        });
      });
    });

    it('fails when no members are present', () => {
      const team = new Team({
        name: 'some name',
      });
      const err = team.validateSync();
      expect(err.errors.members).toBeDefined();
    });

    it('fails when member left is not admin', () => {
      const team = new Team({
        name: 'some name',
        members: [
          {
            user: new User({
              username: 'some username',
              email: 'some@email.com',
            }),
            admin: false,
          },
        ],
      });
      const err = team.validateSync();
      expect(err.errors.members).toBeDefined();
    });

    it('passes when only member left is admin', () => {
      const team = new Team({
        name: 'some name',
        shortname: 'shortname',
        members: [
          {
            user: new User({
              username: 'someone',
              email: 'some@email.com',
            }),
            admin: true,
          },
        ],
      });
      const err = team.validateSync();
      expect(err).toBeUndefined();
    });
  });

  describe('public', () => {
    it('is of type Boolean', () => {
      expect(team.public.type).toBe(Boolean);
    });

    it('defaults to true', () => {
      expect(team.public.default).toEqual(true);
    });
  });

  // TODO: Add logo
});
