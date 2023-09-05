const { series, task } = require('gulp');

// Define a Gulp 4 task called 'logMessage'
task('logMessage', function(cb) {
  console.log('This is a Gulp 4 task that logs a message.');
  cb();
});

// Default task
task('default', series('logMessage'));
