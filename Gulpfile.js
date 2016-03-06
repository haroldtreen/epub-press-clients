const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');

gulp.task('default', () => {
    return gulp.src('app/scripts/*.js')
    .pipe(watch('app/scripts/*.js'))
    .pipe(babel({
        presets: ['es2015'],
    }))
    .pipe(gulp.dest('app/build'));
});
