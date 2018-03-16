const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

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
  lists: [
    {
      type: ObjectId,
      ref: 'List',
    },
  ],
  labels: [
    {
      type: ObjectId,
      ref: 'Label',
    },
  ],
  members: [
    {
      user: {
        type: ObjectId,
        ref: 'User',
      },
      admin: {
        type: Boolean,
        default: false,
      },
    },
  ],
  activity: [
    {
      type: ObjectId,
      ref: 'Activity',
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
