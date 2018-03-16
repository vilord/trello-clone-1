const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;
const isEmail = require('validator/lib/isEmail');

const User = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: {
        validator: x => !x.match(/.\s+./),
        message: 'Whitespace is not allowed',
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: x => isEmail(x),
        message: 'Must be a valid email address',
      },
    },
    name: {
      type: String,
      trim: true,
    },
    initials: {
      type: String,
      uppercase: true,
      validate: {
        validator: x => x.length >= 1 && x.length <= 4,
        message: 'Initials must contain between 1-4 characters.',
      },
    },
    bio: {
      type: String,
      trim: true,
      validate: {
        validator: x => x.length > 0,
        message: 'Bio cannot be an empty String.',
      },
    },
    assigned_cards: [
      {
        type: ObjectId,
        ref: 'Card',
      },
    ],
    boards: [
      {
        board: {
          type: ObjectId,
          ref: 'Board',
        },
        favorite: {
          type: Boolean,
          default: false,
        },
      },
    ],
    teams: [
      {
        type: ObjectId,
        ref: 'Team',
      },
    ],
    activity: {
      type: ObjectId,
      ref: 'Activity',
    },
  },
  {
    timestamps: true,
  },
);

User.static('createUser', function(email, username) {
  return this.create({ email, username });
});

User.static('listUsers', function() {
  return this.find({});
});

module.exports = mongoose.model('User', User);
