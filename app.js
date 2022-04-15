const path = require('path');
const express = require('express');
const rateLimit = require('express-rate-limit');
const AppError = require('./modules/common/utils/appError');
const productsRouter = require('./modules/products/products.routes');
const categoriesRouter = require('./modules/categories/categories.routes');
const usersRouter = require('./modules/users/users.routes');

// const globalErrorHandler = require('./controllers/errorController');

const app = express();

// middlwares
if (process.env.NODE_ENV === 'development ') {
  app.use(morgan('dev'));
}

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);

  next();
});

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  // let allowedDomains = ['https://example.com'];
  // let origin = req.headers.origin;
  // if(allowedDomains.indexOf(origin) > -1){
  //     res.setHeader('Access-Control-Allow-Origin', origin);
  // }

  res.header('Access-Control-Allow-Credentials', 'false');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Expose-Headers', 'Content-Length');
  res.header('Access-Control-Max-Age', '3600');
  res.header(
    'Access-Control-Allow-Headers',
    'Accept, Authorization, Content-Type, X-Requested-With, Range, utc-date'
  );
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  } else {
    return next();
  }
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.requestTime);
  // console.log(req.headers);
  // console.log(req.headers.cookie);
  next();
});

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

//routes
app.use('/api/v1/products', productsRouter);
app.use('/api/v1/categories', categoriesRouter);
app.use('/api/v1/users', usersRouter);
// app.use('/api/v1/admin', adminRouter);

// error hendling for unreal URLs
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// central error hendler
// app.use(globalErrorHandler);

module.exports = app;
