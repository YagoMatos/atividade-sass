var gulp = require("gulp");
var sass = require("gulp-sass");
var rename = require("gulp-rename");
var htmlmin = require('gulp-htmlmin');
var notify    = require("gulp-notify");
var cleanCSS = require('gulp-clean-css');

gulp.task("sass", function(){
	return gulp.src("./source/scss/style.scss")
		.pipe(sass())
        .on("error", notify.onError({title:"erro ao compilar", message:"<%= error.message %>"})
		.pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./dist/css'))
});

gulp.task('html', function() {
  return gulp.src('./source/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('background',function(){
	gulp.watch('./source/scss/style.scss',['sass']);
	gulp.watch('./source/*.html',['html']);
});

