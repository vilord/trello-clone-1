const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const labelColors = require('../constants/label-colors');

const Label = new Schema({
  color: {
    type: String,
    enum: Object.values(labelColors),
    required: true,
  },
  text: {
    type: String,
    maxlength: 35,
  },
});

module.exports = mongoose.model('Label', Label);
