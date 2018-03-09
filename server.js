require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const session = require('express-session');
// const passport = require('passport');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

/**
 * Initialize Express App
 */
const app = express();

/**
 * Database Config
 */
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017';
mongoose
  .connect(mongoURI)
  .then(db => console.log(`Connected to the Database on ${mongoURI}`));
if (process.env.NODE_ENV === 'development') {
  mongoose.set('debug', true);
}

/**
 * Applying Middleware
 */
const sessionSecret = process.env.SESSION_SECRET || 'mySecret';
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(sessionSecret));
app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

/**
 * Routes
 */
const users = require('./routes/users');
const posts = require('./routes/posts');

const prefix = '/api';
app.use(`${prefix}/users`, users);
app.use(`${prefix}/posts`, posts);

/**
 * Catches 404 Errors
 */
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/**
 * Error Handler
 */
app.use(function(err, req, res, next) {
  console.log(err.stack);
  res.send(err);
});

/**
 * Listening Port
 */
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});

