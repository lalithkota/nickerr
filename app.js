var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('express-flash');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');


mongoose.connect( process.env.MONGO_DB_URL_WITH_PASS, { useNewUrlParser: true , useUnifiedTopology: true } , function(err){
  if (err){
    console.error('database not found');
    console.error('Wont be able to do database operations');
  }
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('DATABASE DONE');
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'itsasecret', resave : false , saveUninitialized : false }));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

var Nicker = require('./models/nicker');
var Zebra = require('./models/zebra');

var indexRouter = require('./routes/index');
var homeRouter = require('./routes/home');
var zebraRouter = require('./routes/zebras');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');

app.use('/', indexRouter);
app.use('/home', homeRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/zeb', zebraRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = {};
  if (req.app.get('env') === 'development'){
    res.locals.error = err;
  }
  else{
    if(err.status === 404) res.locals.message = '404 ' + res.locals.message;
  }

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Nickerr' });
});

module.exports = app;
