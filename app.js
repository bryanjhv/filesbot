const express      = require('express'),
      bodyParser   = require('body-parser'),
      cookieParser = require('cookie-parser');


// Create Express app
const app = express();

// Strict settings
app.enable('trust proxy');
app.disable('x-powered-by');
app.enable('strict routing');

// Boot middleware
app.use(cookieParser());
app.use(bodyParser.json());

// Attach 404 handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Attach error handler
app.use((err, req, res, next) => {
  const {message, status = 500} = err;
  res.status(status).json({error: message});
});

// Export the app
module.exports = app;
