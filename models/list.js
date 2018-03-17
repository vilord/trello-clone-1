const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const List = new Schema({
  title: {
    type: String,
    maxlength: 100,
    trim: true,
    required: true,
  },
  cards: [
    {
      type: ObjectId,
      ref: 'Card',
    },
  ],
  archived: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('List', List);
