const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schemas
const UserSchema = require('./user').schema;
const LabelSchema = require('./label').schema;
const ChecklistSchema = require('./checklist').schema;
const CommentSchema = require('./comment').schema;

const Card = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  members: [UserSchema],
  label: [LabelSchema],
  checklists: [ChecklistSchema],
  comments: [CommentSchema],
  due_date: {
    type: Date,
    completed: {
      type: Boolean,
      default: false,
    },
  },
});

module.exports = mongoose.model('Card', Card);
