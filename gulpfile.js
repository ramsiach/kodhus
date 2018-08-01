const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const uglify = require('gulp-uglify-es').default;
const csso = require('gulp-csso');
const rename = require('gulp-rename');

const version = '-v0.1-alpha'

gulp.task('serve', () => {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('src/scss/*.scss', ['sass']);
    gulp.watch("example/index.html").on('change', browserSync.reload);
});

gulp.task('sass', () => {
    return gulp.src('src/scss/kodhus.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

gulp.task('sass-build', () => {
    return gulp.src('src/scss/kodhus.scss')
        .pipe(sass())
        .pipe(csso())
        .pipe(rename({suffix: version+'.min'}))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

gulp.task('js-build', () => {
    return gulp.src('src/js/kodhus.js')
        .pipe(uglify())
        .pipe(rename({suffix: version+'.min'}))
        .pipe(gulp.dest('dist'))
});

gulp.task('js', () => {
    return gulp.src('src/js/kodhus.js')
        .pipe(gulp.dest('dist'))
});

gulp.task('build', ['sass-build', 'js-build']);

gulp.task('default', ['serve']);