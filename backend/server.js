const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const path = require('path');

// Load env vars
// require('dotenv').config();
require('dotenv').config({ path: path.join(__dirname, '../.env') }); // Path to root .env


// Route files
const auth = require('./routes/authRoutes');
const projects = require('./routes/projectRoutes');
const tasks = require('./routes/taskRoutes');

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Cookie parser
app.use(cookieParser());

// Set security headers
app.use(helmet());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  // app.use(morgan('dev'));
  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));
}

// Mount routers
app.use('/api/auth', auth);
app.use('/api/projects', projects);
app.use('/api/projects/:projectId/tasks', tasks);

// Serve static assets (frontend) in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  // app.use(express.static(path.join(__dirname, '/frontend/build')));
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  // Handle React routing, return all requests to React app
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Unified error handling
process.on('unhandled', (reason, promise) => {
  console.log('Unhandled Error:', reason);

  if (reason instanceof Error) {
    console.log(`Stack: ${reason.stack}`);
    console.log('Shutting down due to unhandled error');
  } else {
    console.log('Unhandled rejection at:', promise);
    console.log('Reason:', reason);
  }

  server.close(() => process.exit(1));
});