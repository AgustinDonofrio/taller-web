var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users.routes');
var productsRouter = require('./routes/products.routes');
var commerceRouter = require('./routes/commerces.routes');
var loginRouter = require('./routes/login.routes');
var registerUserRouter = require('./routes/registerUser.routes');
var registerCommerceRouter = require('./routes/registerCommerce.routes');

const mongoose = require('mongoose');
const uri = 'mongodb+srv://iciano:1YaZvNnAUWl2sbqv@taller-web.nuf7yyy.mongodb.net/myapp?retryWrites=true&w=majority&appName=taller-web';


var app = express();

// Conectar a la base de datos
(async () => {
  try {
      // Conectar a la base de datos
      await mongoose.connect(uri);
      console.log('Successfully connected to database');

  } catch (err) {
      console.error('Error:', err);
  } finally {
      // Cerrar la conexión a la base de datos
      //await mongoose.connection.close();
      //console.log('Database connection closed');
  }
})();

// middlewares
app.use(express.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/commerces', commerceRouter);
app.use('/login', loginRouter);
app.use('/register', registerUserRouter);
app.use('/registerCommerce', registerCommerceRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;