const Team = require('../models/team');
const User = require('../models/user');

// Schemas
const BoardSchema = require('../models/board').schema;
const UserSchema = User.schema;

describe('Team Model', () => {
  const team = Team.schema.obj;

  describe('name', () => {
    it('exists', () => {
      expect(team.name).toBeDefined();
    });

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
    it('exists', () => {
      expect(team.shortname).toBeDefined();
    });

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
              username: 'some username',
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
      expect(team.shortname.unique).toBe(true);
    });
  });

  describe('website', () => {
    it('exists', () => {
      expect(team.website).toBeDefined();
    });

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
              username: 'some username',
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
    it('exists', () => {
      expect(team.description).toBeDefined();
    });

    it('is of type String', () => {
      expect(team.description.type).toBe(String);
    });
  });

  describe('boards', () => {
    it('exists', () => {
      expect(team.boards).toBeDefined();
    });

    it('is an Array of BoardSchemas', () => {
      expect(team.boards).toBeInstanceOf(Array);
      expect(team.boards[0]).toBe(BoardSchema);
    });
  });

  describe('members', () => {
    it('exists', () => {
      expect(team.members).toBeDefined();
    });

    it('is an Array', () => {
      expect(team.members.type).toBeInstanceOf(Array);
    });

    describe('members object', () => {
      const obj = team.members.type[0];

      it('user field is a UserSchema', () => {
        expect(obj.user).toBe(UserSchema);
      });

      it('admin field is of type Boolean', () => {
        expect(obj.admin.type).toBe(Boolean);
      });

      it('admin defaults to false', () => {
        expect(obj.admin.default).toBe(false);
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
              username: 'some username',
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
    it('exists', () => {
      expect(team.public).toBeDefined();
    });

    it('is of type Boolean', () => {
      expect(team.public.type).toBe(Boolean);
    });

    it('defaults to true', () => {
      expect(team.public.default).toBe(true);
    });
  });

  // TODO: Add logo
});
