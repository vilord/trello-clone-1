const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Checklist = new Schema({
  title: {
    type: String,
    required: true,
  },
  items: [
    {
      completed: {
        type: Boolean,
        default: false,
      },
      text: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model('Checklist', Checklist);
