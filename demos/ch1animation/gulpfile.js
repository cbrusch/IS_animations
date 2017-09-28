// add all of your libraries
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('autoprefixer');
var browserSync = require('browser-sync').create();

// function to convert sass into css
gulp.task('sass', function() {
	return gulp.src('app/scss/app.scss')
		.pipe(sass())
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

// function to update and refresh browser
gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: 'app'
		},
		online: true
	});
});

// function that calls the sass and browserSync functions when you save a change to a .scss, .js, or .html file
gulp.task('watch', ['browserSync', 'sass'], function() {
	gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});