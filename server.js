// load the env consts
require('dotenv').config();
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
// session middleware
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');

const indexRouter = require('./routes/index');
const playlistsRouter = require('./routes/playlists');
const songRouter = require('./routes/songs')


// create the Express app
const app = express();

// connect to the MongoDB with mongoose
require('./config/database');
// configure Passport
require('./config/passport');



// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(logger('dev'));
app.use(cookieParser());
// mount the session middleware
app.use(methodOverride('_method'));
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());


// Add this middleware BELOW passport middleware
app.use(function (req, res, next) {
  res.locals.user = req.user; // assinging a property to res.locals, makes that said property (user) availiable in every
  // single ejs view
  next();
});

// mount all routes with appropriate base paths
app.use('/', indexRouter);
app.use('/playlists', playlistsRouter);
app.use('/', songRouter);


// invalid request, send 404 page
app.use(function(req, res) {
  res.status(404).send('Cant find that!');
});

app.use(function(err, req, res, next){
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err: {};
  res.status(err.status || 500);
  //res.render('error');
})

module.exports = app;
