const gulp = require('gulp');
const browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
gulp.task('serve', () => {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('src/scss/*.scss', ['sass']);
    gulp.watch("example/index.html").on('change', browserSync.reload);
})

gulp.task('sass', () => {
    return gulp.src('src/scss/kodhus.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});
gulp.task('js', () => {
    return gulp.src('src/js/kodhus.js')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);