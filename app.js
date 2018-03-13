// require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// const session = require('express-session');
// const mongoose = require('mongoose');
// const MongoStore = require('connect-mongo')(session);

// const passport = require('passport');

/**
 * Initialize Express App
 */
const app = express();

/**
 * Applying Middleware
 */
const sessionSecret = process.env.SESSION_SECRET || 'mySecret';
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(sessionSecret));

// app.use(
//   session({
//     secret: sessionSecret,
//     resave: false,
//     saveUninitialized: true,
//     store: new MongoStore({ mongooseConnection: mongoose.connection }),
//   })
// );

app.get('/', function(req, res) {
  res.status(200).send('worked');
});

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
  res.status(err.status || 500).send(err);
});

module.exports = app;
