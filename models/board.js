const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

const Schema = mongoose.Schema;

// Schemas
const LabelSchema = require('./label').schema;
const ListSchema = require('./list').schema;
const UserSchema = require('./user').schema;

// Constants
const backgroundColors = require('../constants/background-colors');
const { BLUE } = backgroundColors;

const Board = new Schema({
  title: {
    type: String,
    required: true,
  },
  visibility: {
    type: String,
    enum: ['public', 'team', 'private'],
    default: 'public',
  },
  lists: [ListSchema],
  labels: [LabelSchema],
  members: [
    {
      user: UserSchema,
      admin: {
        type: Boolean,
        default: false,
      },
    },
  ],
  theme: {
    color: {
      type: String,
      enum: Object.values(backgroundColors),
      default: BLUE,
    },
    picture: {
      type: String,
      validate: {
        validator: x => isURL(x),
        message: 'Must be a valid URL',
      },
    },
  },
});

module.exports = mongoose.model('Board', Board);
