const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    name: String,
  },
  {
    timestamps: true,
  },
);

User.static('createUser', function(name, username) {
  return this.create({name, username});
});

User.static('listUsers', function() {
  return this.find({});
});

module.exports = mongoose.model('User', User);
