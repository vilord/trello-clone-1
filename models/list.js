const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schemas
const CardSchema = require('./card').schema;

const List = new Schema({
  title: { 
    type: String,
    required: true,
  },
  cards: [CardSchema],
  archived: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('List', List);
