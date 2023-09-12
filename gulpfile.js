const { series, task, src, dest, watch } = require('gulp');  // Here, you're importing the series and task functions from the 'gulp' package. These functions are used to define and run Gulp tasks.
const fileinclude = require('gulp-file-include');
const browserSync = require('browser-sync').create();

// // Define a Gulp 4 task called 'logMessage'
// task('logMessage', async function(cb) {
//   console.log('This is a Gulp 4 task that logs a message.');
//   cb();
// });

// Default task
// task('default', series('logMessage'));

const fileInludeSettings = {
  prefix: '@@',
  basepath: '@file'
};

task('includeFiles', function () {
  return src('./app/*.html')
    .pipe(fileinclude(fileInludeSettings))
    .pipe(dest('./dist/'))
})

task('serve', function () {
  browserSync.init({
    server: {
      baseDir: './dist/'
    }
  });

  watch('./app/*.html', series('includeFiles')).on('change', browserSync.reload);
  watch('./app/blocks/*.html', series('includeFiles')).on('change', browserSync.reload);

});

task('default', series('includeFiles', 'serve'));