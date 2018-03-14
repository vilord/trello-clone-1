const Card = require('../models/card');

// Schemas
const LabelSchema = require('../models/label').schema;
const ChecklistSchema = require('../models/checklist').schema;
const CommentSchema = require('../models/comment').schema;
const UserSchema = require('../models/user').schema;

describe('Card model', () => {
  const card = Card.schema.obj;

  describe('title field', () => {
    it('exists', () => {
      expect(card.title).toBeDefined();
    });

    it('is of type String', () => {
      expect(card.title.type).toBe(String);
    });

    it('is required', () => {
      const card = new Card();
      const err = card.validateSync();
      expect(err.errors.title).toBeDefined();
    });
  });

  describe('description field', () => {
    it('exists', () => {
      expect(card.description).toBeDefined();
    });

    it('is of type String', () => {
      expect(card.description).toBe(String);
    });
  });

  describe('members field', () => {
    it('exists', () => {
      expect(card.members).toBeDefined();
    });

    it('is an Array of UserSchemas', () => {
      expect(card.members).toBeInstanceOf(Array);
      expect(card.members[0]).toBe(UserSchema);
    });
  });

  describe('labels field', () => {
    it('exists', () => {
      expect(card.label).toBeDefined();
    });

    it('is an Array of LabelSchemas', () => {
      expect(card.label).toBeInstanceOf(Array);
      expect(card.label[0]).toBe(LabelSchema);
    });
  });

  describe('comments field', () => {
    it('exists', () => {
      expect(card.comments).toBeDefined();
    });

    it('is an Array of CommentSchemas', () => {
      expect(card.comments).toBeInstanceOf(Array);
      expect(card.comments[0]).toBe(CommentSchema);
    });
  });

  describe('checklists field', () => {
    it('exists', () => {
      expect(card.checklists).toBeDefined();
    });

    it('is an Array of ChecklistSchemas', () => {
      expect(card.checklists).toBeInstanceOf(Array);
      expect(card.checklists[0]).toBe(ChecklistSchema);
    });
  });

  describe('due_date field', () => {
    it('exists', () => {
      expect(card.due_date).toBeDefined();
    });

    it('is of type Date', () => {
      expect(card.due_date.type).toBe(Date);
    });

    it('has completed Boolean status', () => {
      expect(card.due_date.completed).toBeDefined();
      expect(card.due_date.completed.type).toBe(Boolean);
      expect(card.due_date.completed.default).toEqual(false);
    });
  });
});
