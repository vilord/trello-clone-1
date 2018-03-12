const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Customize to your Application Needs
const User = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    id: Number,
    name: String,
  },
  {
    timestamps: true,
  },
);

User.static('findByUsername', function(username) {
  return this.find({ username })
    .exec();
});

module.exports = mongoose.model('User', User);
