const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;
const isEmail = require('validator/lib/isEmail');
const isUrl = require('validator/lib/isUrl');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      match: /^((?!\s+).)*$/,
      required: true,
    },
    password: {
      type: String,
      minlength: 6,
      maxlength: 256,
      // TODO: password match
      // match: /^.*[a-zA-Z].*[0-9]+.*$/,
      bcrypt: true,
      required: function() {
        return !this.google_id;
      },
    },
    google_id: {
      type: Number,
      required: function() {
        return !this.password;
      },
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
      validate: {
        validator: x => isEmail(x),
        message: 'Must be a valid email address',
      },
    },
    name: {
      type: String,
      required: true,
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
    avatar: {
      type: String,
      trim: true,
      validate: {
        validator: x => isUrl(x),
        message: 'it needs a valid URL',
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
    activity: [
      {
        type: ObjectId,
        ref: 'Activity',
      },
    ],
  },
  {
    timestamps: true,
  },
);

/**
 * Password Hashing and Salting Plugin
 */
UserSchema.plugin(require('mongoose-bcrypt'), { rounds: 8 });

/**
 * Remove sensitive information by default
 * when transforming the model toObject.
 */
UserSchema.options.toObject = {
  transform: function(doc, ret, options) {
    delete ret._id;
    delete ret.__v;
    delete ret.password;
    delete ret.createdAt;
    delete ret.updatedAt;
    delete ret.google_id;
    return ret;
  },
};

/**
 * Pre validation hook
 */
UserSchema.pre('validate', async function(next) {
  if (!this.name) {
    const err = new Error('User validation failed: name is required.');
    err.name = 'ValidationError';
    return next(err);
  }

  // Generates unique username based on the name.
  const genUsername = async name => {
    let username = name.replace(/\s/g, '').toLowerCase();
    const count = await this.model('User')
      .find({ username: { $regex: username } })
      .lean()
      .count();
    username += count === 0 ? '' : count;
    return username;
  };

  this.username = this.username || (await genUsername(this.name));

  next();
});

module.exports = mongoose.model('User', UserSchema);
