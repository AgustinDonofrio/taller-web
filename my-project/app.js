require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var methodOverride = require('method-override');
//var multer = require('multer');

var indexRouter = require('./routes/index');
var productsRouter = require('./routes/products.routes');
var commerceRouter = require('./routes/commerces.routes');
var loginRouter = require('./routes/login.routes');
var registerRouter = require('./routes/register.routes');
var registerUserRouter = require('./routes/registerUser.routes');
var registerCommerceRouter = require('./routes/registerCommerce.routes');
var carritoRouter = require('./routes/carrito.routes');
var storesRouter = require('./routes/stores.routes');
var passport = require('./passport-config');
var authRouter = require('./routes/auth.routes');


const mongoose = require('mongoose');
const uri = 'mongodb+srv://iciano:1YaZvNnAUWl2sbqv@taller-web.nuf7yyy.mongodb.net/myapp?retryWrites=true&w=majority&appName=taller-web';


var app = express();

// Conectar a la base de datos
(async () => {
  try {
      await mongoose.connect(uri);
      console.log('Successfully connected to database');
  } catch (err) {
      console.error('Error:', err);
  }
})();

app.use(session({
  secret: '12345', 
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// middlewares
app.use(express.json());
app.use(methodOverride('_method'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/home', indexRouter);
app.use('/products', productsRouter);
app.use('/commerces', commerceRouter);
app.use('/', loginRouter);
app.use('/register', registerRouter);
app.use('/registerUser', registerUserRouter);
app.use('/registerCommerce', registerCommerceRouter);
app.use('/carrito', carritoRouter);
app.use('/stores', storesRouter);
app.use('/auth', authRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;