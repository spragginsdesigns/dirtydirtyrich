const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const pug = require('gulp-pug')
const browserSync = require('browser-sync').create()
const gutil = require('gulp-util')
const browserify = require('gulp-browserify')


gulp.task('scripts', function() {
  gulp.src('src/js/**/*.js')
    .pipe(browserify({
      insertGlobals : true,
    }))
    .pipe(gulp.dest('dist/js'))
    .on('error', gutil.log)
    .pipe(browserSync.stream())
})

gulp.task('sass', function () {
  return gulp.src('src/sass/**/*.scss')
    .pipe(sass({ style: 'expanded', sourceComments: 'map', errLogToConsole: true }))
    .pipe(autoprefixer('last 2 version', "> 1%", 'ie 8', 'ie 9'))
    .pipe(gulp.dest('dist/css'))
    .on('error', gutil.log)
    .pipe(browserSync.stream())
})

gulp.task('views', function buildHTML() {
  return gulp.src('src/views/pages/**/*.pug')
    .pipe(pug({ 
      doctype: 'html',
      pretty: true
    }))
    .pipe(gulp.dest('dist'))
    .on('error', gutil.log)
    .pipe(browserSync.stream())
})

gulp.task('serve', ['sass', 'views', 'scripts'], function () {
  browserSync.init({
    host: "0.0.0.0",
    server: "./dist"
  })
  gulp.watch("src/sass/**/*.scss", ['sass'])
  gulp.watch("src/js/**/*.js", ['scripts'])
  gulp.watch("src/views/**/*.pug", ['views'])
  gulp.watch("dist/**/*.html").on('change', browserSync.reload)
})

gulp.task('build', ['sass', 'views', 'scripts'], () => console.log("building..."))
