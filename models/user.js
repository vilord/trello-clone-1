const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: String,
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
