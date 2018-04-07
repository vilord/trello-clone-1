const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');
const hashids = require('../config/hashids');

const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

// Constants
const backgroundColors = require('../constants/background-colors');
const { BLUE } = backgroundColors;

const BoardSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      match: /^((?!\s{2,}).)*$/,
    },
    visibility: {
      type: String,
      enum: ['public', 'team', 'private'],
      default: 'private',
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
        validator: x => x.length > 0,
        message: 'Boards must contain at least one member',
      },
    },
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
  },
  {
    timestamps: true,
  },
);

BoardSchema.options.toObject = {
  transform: function(doc, ret, options) {
    ret.id = hashids.encodeHex(ret._id);
    delete ret._id;
    delete ret.__v;
    delete ret.createdAt;
    delete ret.updatedAt;
    return ret;
  },
};

module.exports = mongoose.model('Board', BoardSchema);
