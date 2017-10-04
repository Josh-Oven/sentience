var gulp = require('gulp')
, sourcemaps = require('gulp-sourcemaps')
, sass = require('gulp-sass')
, concat = require('gulp-concat')
, CacheBuster = require('gulp-cachebust')
, print = require('gulp-print')
, babel = require('gulp-babel')
, uglify = require('gulp-uglify')

var cachebust = new CacheBuster();

gulp.task('build-css', function(){
  return gulp.src('./public/assets/styles/**/*.*')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(cachebust.resources())
    .pipe(concat('styles.css'))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist'));

})


gulp.task('build-js', function() {
   return gulp.src('./public/app/js/*.js')
      .pipe(sourcemaps.init())
      .pipe(print())
      .pipe(babel({ presets: ['es2015'] }))
      .pipe(concat('bundle.js'))
      //.pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./dist/js'));
});

gulp.task('build-vanilla-js', function() {
   return gulp.src('./public/app/vanilla-js/*.js')
      .pipe(babel({ presets: ['es2015'] }))
      .pipe(gulp.dest('./dist/vanilla-js'));
});

gulp.task('copy-images', function(){
  gulp.src('./public/assets/images/**/*.*')
  .pipe(gulp.dest('./dist/assets/images'))
})

gulp.task('get-json', function(){
  gulp.src('./public.json')
  .pipe(gulp.dest('dist'))
})

gulp.task('build', ['build-css', 'build-js', 'build-vanilla-js', 'views', 'copy-images', 'get-json'], function() {
    return gulp.src('./public/index.html')
        .pipe(cachebust.references())
        .pipe(gulp.dest('dist'));
});

gulp.task('views', function() {
    return gulp.src('./public/app/views/**/*.html')
        .pipe(cachebust.references())
        .pipe(gulp.dest('./dist/views'));
});

gulp.task('watch', function() {
    return gulp.watch(['./public/index.html','./partials/*.html', './public/assets/styles/**/*.*', './public/app/**/*.js', './public/app/vanilla-js/*.js', './public/app/views/**/*.html', '.public/assets/images/**/*.*', './*.json'], ['build']);
});

gulp.task('default', ['build', 'watch'])
