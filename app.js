const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser= require('body-parser');
const cors = require("cors");
const dotenv = require('dotenv');
require('./config/db');

dotenv.config();

// Routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const districtRouter = require('./routes/districts');
const partyRouter = require('./routes/parties');
const candidateRouter = require('./routes/candidates');
const pollingStationRouter = require('./routes/pollingStations');
const sectionRouter = require('./routes/sections');
const resultRouter = require('./routes/results');
const lookupRouter = require('./routes/lookups');
const authRouter = require('./routes/auth');
const testRouter = require('./routes/test');

// Allow frontend app to communicate
const corsOptions = {
  origin: "http://localhost:8081",
  credentials: true
};

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, 'public')));


// Endpoints
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/districts', districtRouter);
app.use('/parties', partyRouter);
app.use('/candidates', candidateRouter);
app.use('/polling-stations', pollingStationRouter);
app.use('/sections', sectionRouter);
app.use('/results', resultRouter);
app.use('/lookups', lookupRouter);
app.use('/user', authRouter);
app.use('/test', testRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
