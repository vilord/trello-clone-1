const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const Checklist = new Schema({
  title: {
    type: String,
    required: true,
  },
  items: [
    {
      completed: {
        type: Boolean,
        default: false,
      },
      text: {
        type: String,
        required: true,
      },
    },
  ],
});

const Card = new Schema({
  title: {
    type: String,
    required: true,
  },
  list: {
    type: ObjectId,
    ref: 'List',
  },
  board: {
    type: ObjectId,
    ref: 'Board',
  },
  description: String,
  members: [
    {
      type: ObjectId,
      ref: 'User',
    },
  ],
  label: [
    {
      type: ObjectId,
      ref: 'Label',
    },
  ],
  checklists: [Checklist],
  comments: [
    {
      type: ObjectId,
      ref: 'User',
    },
  ],
  due_date: {
    type: Date,
    completed: {
      type: Boolean,
      default: false,
    },
  },
  archived: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Card', Card);
