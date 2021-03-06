const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const Team = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    match: /^((?!\s{2,}).)*$/,
  },
  shortname: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
    match: /^\w{3,}$/,
    unique: true,
  },
  website: {
    type: String,
    lowercase: true,
    trim: true,
    validate: {
      validator: x => isURL(x),
      message: 'You need to provide a valid URL',
    },
  },
  description: {
    type: String,
    maxlength: 20000,
    trim: true,
  },
  boards: [
    {
      type: ObjectId,
      ref: 'Board',
    },
  ],
  members: {
    type: [
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
    validate: {
      validator: arr => arr.length >= 1 && arr.filter(x => x.admin).length >= 1,
      message: 'You need at least one member with admin status.',
    },
  },
  public: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('Team', Team);
