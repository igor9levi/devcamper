const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const fileupload = require('express-fileupload');
const connectDB = require('./config/db');

// Middlewares
const errorHandler = require('./middlewares/error');

// Routes
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');

dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Middlewares - MUST BE ORDERED before routes !!!
// Reads NODE_ENV from .env
if (process.env.NODE_ENV === 'dev') {
  app.use(morgan('dev'));
}

// File uploader
app.use(fileupload());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount routes
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);

// Error middleware - all middlewares executed in linear order
// thus needs to be after routes handler middleware
app.use(errorHandler);

const PORT = process.env.PORT;

const server = app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode, listening on port: ${PORT}`
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error Unhandled Rejection: ${err.message}`);
  // Close server & exit process
  // server.close(() => process.exit(1));
});
