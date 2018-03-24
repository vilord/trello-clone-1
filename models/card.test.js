const Card = require('./card');
const { ObjectId } = require('mongoose').Schema.Types;

describe('Card model', () => {
  const card = Card.schema.obj;

  describe('title', () => {
    it('is of type String', () => {
      expect(card.title.type).toBe(String);
    });

    it('is required', () => {
      const card = new Card();
      const err = card.validateSync();
      expect(err.errors.title).toBeDefined();
    });

    it('is trimmed', () => {
      const card = new Card({
        title: '  some title  ',
      });
      expect(card.title).toEqual('some title');
    });
  });

  describe('description', () => {
    it('is of type String', () => {
      expect(card.description.type).toBe(String);
    });

    it('has maxlength of 20 thousand characters', () => {
      expect(card.description.maxlength).toEqual(20000);
    });
  });

  describe('list', () => {
    it('is of type ObjectId', () => {
      expect(card.list.type).toBe(ObjectId);
    });

    it('is of ref List', () => {
      expect(card.list.ref).toEqual('List');
    });
  });

  describe('board', () => {
    it('is of type ObjectId', () => {
      expect(card.board.type).toBe(ObjectId);
    });

    it('is of ref Board', () => {
      expect(card.board.ref).toEqual('Board');
    });
  });

  describe('members', () => {
    it('is an Array', () => {
      expect(card.members).toBeInstanceOf(Array);
    });

    describe('obj', () => {
      const obj = card.members[0];

      it('is of type ObjectId', () => {
        expect(obj.type).toBe(ObjectId);
      });

      it('is of ref User', () => {
        expect(obj.ref).toBe('User');
      });
    });
  });

  describe('labels', () => {
    it('is an Array', () => {
      expect(card.label).toBeInstanceOf(Array);
    });

    describe('obj', () => {
      const obj = card.label[0];

      it('is of type ObjectId', () => {
        expect(obj.type).toBe(ObjectId);
      });

      it('if of ref Label', () => {
        expect(obj.ref).toBe('Label');
      });
    });
  });

  describe('comments', () => {
    it('is an Array', () => {
      expect(card.comments).toBeInstanceOf(Array);
    });

    describe('obj', () => {
      const obj = card.comments[0];

      it('is of type ObjectId', () => {
        expect(obj.type).toBe(ObjectId);
      });

      it('is of ref User', () => {
        expect(obj.ref).toBe('User');
      });
    });
  });

  describe('checklists', () => {
    it('is an Array of objects', () => {
      expect(card.checklists).toBeInstanceOf(Array);
    });

    describe('obj', () => {
      const Checklist = card.checklists[0];
      const checklist = Checklist.obj;

      describe('title', () => {
        it('is of type String', () => {
          expect(checklist.title.type).toBe(String);
        });

        it('is required', () => {
          expect(checklist.title.required).toBe(true);
        });
      });

      describe('items', () => {
        it('is array', () => {
          expect(checklist.items).toBeInstanceOf(Array);
        });

        describe('obj', () => {
          const obj = checklist.items[0];

          describe('completed', () => {
            it('is of type Boolean', () => {
              expect(obj.completed.type).toBe(Boolean);
            });

            it('items boolean status defaults to false', () => {
              expect(obj.completed.default).toBe(false);
            });
          });

          describe('text', () => {
            it('is of type String', () => {
              expect(obj.text.type).toBe(String);
            });
            it('is required', () => {
              expect(obj.text.required).toBe(true);
            });
          });
        });
      });
    });
  });

  describe('due_date', () => {
    it('is of type Date', () => {
      expect(card.due_date.type).toBe(Date);
    });

    it('has completed Boolean status', () => {
      expect(card.due_date.completed).toBeDefined();
      expect(card.due_date.completed.type).toBe(Boolean);
      expect(card.due_date.completed.default).toEqual(false);
    });
  });

  describe('archived', () => {
    it('is of type Boolean', () => {
      expect(card.archived.type).toBe(Boolean);
    });

    it('defaults to false', () => {
      expect(card.archived.default).toBe(false);
    });
  });
});
