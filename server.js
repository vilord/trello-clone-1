const app = require('./app');
const mongoose = require('mongoose');

/**
 * Database Config
 */
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/trello';

mongoose
  .connect(mongoURI)
  .then(db => console.log(`Connected to the Database on ${mongoURI}`));
if (process.env.NODE_ENV === 'development') {
  mongoose.set('debug', true);
}

/**
 * Listening Port
 */
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});

module.exports = app;
