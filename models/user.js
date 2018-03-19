const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;
const isEmail = require('validator/lib/isEmail');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: /^((?!\s+).)*$/,
    },
    password: {
      type: String,
      bcrypt: true,
    },
    email: {
      type: String,
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
      match: /^((?!\s{2,}).)*$/,
      maxlength: 70,
    },
    initials: {
      type: String,
      uppercase: true,
      maxlength: 4,
      minlength: 1,
      match: /^((?!\s).)*$/,
    },
    bio: {
      type: String,
      trim: true,
      minlength: 1,
      maxlength: 500,
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

UserSchema.plugin(require('mongoose-bcrypt'), { rounds: 8 });

// UserSchema.static('createUser', function(email, username) {
//   return this.create({ email, username });
// });

// UserSchema.static('listUsers', function() {
//   return this.find({});
// });

module.exports = mongoose.model('User', UserSchema);
