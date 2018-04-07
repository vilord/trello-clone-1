const Hashids = require('hashids');

module.exports = new Hashids(
  process.env.HASHIDS_SALT,
  process.env.HASHIDS_MIN_LENGTH,
);

