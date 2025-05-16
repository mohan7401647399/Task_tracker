const app = require('./app');

// Handle uncaught exceptions
process.on('uncaughtException', err => {
  console.log(`ERROR: ${err.stack}`);
  console.log('Shutting down due to uncaught exception');
  process.exit(1);
});