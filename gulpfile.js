var gulp = require('gulp'),
	uglify = require('gulp-uglify');
	
gulp.task('script',function(err){
	gulp.src('src/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
	//if(err) console.error(err);
});
gulp.task('test',function(){
	console.warn("it's test message...");
});