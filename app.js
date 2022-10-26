var createError = require('http-errors');
var express = require('express');
var path = require('path');   
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
const expressSession = require("express-session")
const userModel = require("./routes/users")
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressSession({
  resave:false,
  saveUninitialized:false,
  secret:"anurag"
}))
app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser(userModel.serializeUser())
passport.deserializeUser(userModel.deserializeUser())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler

module.exports = app;
