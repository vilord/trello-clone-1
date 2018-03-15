const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schemas
const UserSchema = require('./user').schema;
const BoardSchema = require('./board').schema;
const CardSchema = require('./card').schema;

const Activity = new Schema(
  {
    user: {
      type: UserSchema,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    board: {
      type: BoardSchema,
      required: true,
    },
    card: CardSchema,
    mentions: [UserSchema],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Activity', Activity);
