'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const gulpSequence = require('gulp-sequence');
const del = require('del');
const cleancss = require('gulp-clean-css');
const pump = require('pump');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const sassLint = require('gulp-sass-lint');
const htmlmin = require('gulp-htmlmin');
const eslint = require('gulp-eslint');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const sizereport = require('gulp-sizereport');
const header = require('gulp-header');
const filter = require('gulp-filter');

const EMPTY_FRONT_MATTER = '---\n---\n';

gulp.task('sass', (done) => {
  const cssFilter = filter(['**/*.css'], { restore: true });

  pump([
    gulp.src('sass/**/[^_]*.scss'),
    sourcemaps.init(),
    sassLint(),
    sassLint.format(),
    sassLint.failOnError(),
    sass()
      .on('error', sass.logError),
    autoprefixer(),
    cleancss(),
    sourcemaps.write('./maps'),
    cssFilter,
    header(EMPTY_FRONT_MATTER),
    cssFilter.restore,
    gulp.dest('../stylesheets'),
  ], done);
});

gulp.task('html', () => {
  gulp.src('html/**/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true,
    }))
    .pipe(header(EMPTY_FRONT_MATTER))
    .pipe(gulp.dest('..')
  );
});

gulp.task('js', (done) => {
  pump([
    gulp.src(['scripts/**/*.js', '!scripts/**/*.test.js']),
    sourcemaps.init(),
    eslint(),
    eslint.format(),
    eslint.failAfterError(),
    babel({ presets: ['es2015'] }),
    concat('all.min.js'),
    uglify(),
    sourcemaps.write('./maps'),
    gulp.dest('../scripts'),
  ], done);
});

gulp.task('images', () => {
  gulp.src('imgs/**/*.{png,svg,jpg}')
    .pipe(imagemin())
    .pipe(gulp.dest('../imgs'));
});

gulp.task('clean', () => {
  del.sync(['../**/*', '!..', '!../_build', '!../_build/**'], {
    force: true,
  });
});

gulp.task('watch', ['build'], () => {
  gulp.watch(['html/**/*.html'], ['html']);
  gulp.watch('sass/**/*.scss', ['sass']);
  gulp.watch('scripts/**/*.js', ['js']);
  gulp.watch('imgs/**/*.{png,svg,jpg}', ['images']);
});

gulp.task('report', () => {
  return gulp.src(['../**/*', '!..', '!../_build', '!../_build/**'])
    .pipe(sizereport({
      gzip: true,
    }));
});

gulp.task('build', gulpSequence('clean', ['sass', 'html', 'js', 'images'], 'report'));

gulp.task('default', ['build']);
