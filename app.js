const path = require('path');
const express = require('express');
const logger = require('morgan');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const helmet = require('helmet');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

/**
 * Initialize Express App
 */
const app = express();

/**
 * Applying Middleware
 */
const sessionSecret = process.env.SESSION_SECRET || 'mySecret';
app.use(helmet());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(sessionSecret));

app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  }),
);
app.use(passport.initialize());
app.use(passport.session());

/**
 * Routes
 */
const auth = require('./routes/auth');
const users = require('./routes/users');
const boards = require('./routes/boards');

app.use('/auth', auth);
app.use('/users', users);
app.use('/boards', boards);

/*
  Serve the Single Page App in Production only
*/
if (process.env.NODE_ENV === 'production') {
  app.use(favicon(path.join(__dirname, 'client/build', 'favicon.ico')));
  app.use(express.static('./client/build'));

  // Catch any other address and serve index.html
  app.get('*', function(req, res) {
    res.sendfile(__dirname + '/client/build/index.html');
  });
}

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
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

module.exports = app;
