const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const Activity = new Schema(
  {
    user: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    board: {
      type: ObjectId,
      ref: 'Board',
    },
    card: {
      type: ObjectId,
      ref: 'Card',
    },
    mentions: [
      {
        type: ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Activity', Activity);
