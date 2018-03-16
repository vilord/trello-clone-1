const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const emojiCodes = require('../constants/emoji-codes');

const Comment = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    text: {
      type: String,
      required: true,
    },
    emoji_reaction: {
      text_code: {
        type: String,
        enum: emojiCodes,
      },
      users: {
        type: [{
          type: Schema.Types.ObjectId,
          ref: 'User',
        }],
        validate: {
          validator: function(x) {
            return !this.emoji_reaction.text_code || x.length >= 1;
          },
          message: 'Your emoji_reaction need at least one user',
        },
      },
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Comment', Comment);
