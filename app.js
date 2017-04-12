const express    = require('express'),
      routes     = require('./routes'),
      bodyParser = require('body-parser'),
      verify     = require('./utils/verify');


// Create Express app
const app = express();

// Strict settings
app.enable('trust proxy');
app.disable('x-powered-by');
app.enable('strict routing');

// Boot middleware
app.use(bodyParser.json({verify}));

// Setup routes
const wh = process.env.WH;
app.get(wh, routes.verify);
app.post(wh, routes.answer);
app.put('/', routes.resend);

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
