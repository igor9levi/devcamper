const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

// Routes
const bootcamps = require('./routes/bootcamps');

dotenv.config();

const app = express();

// Mount routes
app.use('/api/v1/bootcamps', bootcamps);

// Middlewares
if (process.env.NODE_ENV === 'dev') {
  app.use(morgan('dev'));
}

const PORT = process.env.PORT;

app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode, listening on port: ${PORT}`
  )
);
