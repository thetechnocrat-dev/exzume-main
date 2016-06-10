// load express application and basic middleware
var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var compress = require('compression');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// setup configurations
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var config = require('./config/config');

if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
} else if (process.NODE_ENV === 'production') {
  app.use(compress());
}

// setup database
var db = require('./config/mongoose')();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// add middleware to express app
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//configure passport
var passport = require('passport');
var expressSession = require('express-session');
var MongoStore = require('connect-mongo')(expressSession);
app.use(expressSession({
  secret: 'abc123',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    url: config.db,
    ttl: 3 * 24 * 60 * 60, // stores session 'time to live (in seconds)'
  }),
}));
app.use(passport.initialize());
app.use(passport.session());

// add flash middleware - must occur after session middleware
var flash = require('connect-flash'); // must be placed after session!
app.use(flash());

// initialize Passport
var initPassport = require('./config/passport/init');
initPassport(passport);

// routes
var main = express.Router();
require('./routes/main')(main, passport);
app.use('/', main);

var secure = express.Router();
require('./routes/secure')(secure, passport);
app.use('/secure', secure);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler - will print stacktraces
if (app.get('env') === 'dev') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

// production error handler - no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

module.exports = app;
