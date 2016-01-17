var gulp = require('gulp');
var less = require('gulp-less');
//var gutil = require('gulp-util');
var clean = require('gulp-clean');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var filter = require('gulp-filter');
var sass = require('gulp-ruby-sass');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync');
var minifycss = require('gulp-minify-css');
var watchPath = require('gulp-watch-path');
var autoprefixer = require('gulp-autoprefixer');

var breload = browserSync.reload;

gulp.task('test',function(){
    console.log('Tt works!');
});

gulp.task('server',['watchjs','watchcss','watchless','watchsass','watchcopy'],function(){
    browserSync({
        files:"**",
        server:{
            baseDir:'./dist'
        }
    });
});

gulp.task('clean',function(){
    return gulp.src('dist/**/*',{read:false})
        .pipe(clean({force:true}));
});

//压缩js，并输出到dist
gulp.task('js',function(){
    var srcPath = 'src/js/**/*.js',
        distPath = 'dist/js';
    return gulp.src(srcPath)
        .pipe(changed(distPath))
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(gulp.dest(distPath))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        //.pipe(concat('common.js'))
        .pipe(gulp.dest(distPath));
});
//监听js文件
gulp.task('watchjs',['js'],function(){
    var watcher = gulp.watch('src/js/*.js',['js']);
    watcher.on('change',breload);
});

//压缩css，并输出到dist
gulp.task('css',function(){
    var srcPath = 'src/css/**/*.css',
        distPath = 'dist/css';
    return gulp.src(srcPath)
        .pipe(changed(distPath))
        .pipe(autoprefixer({
            browsers: ['last 2 version', 'ie 8', 'ie 9']
        }))
        .pipe(gulp.dest(distPath))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest(distPath))
        .pipe(breload({stream:true}));
});

//监听css文件
gulp.task('watchcss',['css'],function(){
    gulp.watch('src/css/*.css',['css']);
});


//编译less
gulp.task('less',function(){
    var srcPath = 'src/less/**/*.less',
        distPath = 'dist/css';
    return gulp.src(srcPath)
        .pipe(changed(distPath))
        .pipe(autoprefixer({
            browsers: ['last 2 version', 'ie 8', 'ie 9']
        }))
        .pipe(less())
        .pipe(gulp.dest(distPath))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest(distPath))
        .pipe(breload({stream:true}));
});
//监听less文件
gulp.task('watchless',['less'],function(){
    gulp.watch('src/less/*.less',['less']);
});

//编译sass
gulp.task('sass',function(){
    var srcPath = 'src/sass/**/*.*',
        distPath = 'dist/css';
    return sass(srcPath)
        .on('error', function (err) {
            console.error('Error!', err.message);
        })
        .pipe(changed(distPath))
        .pipe(autoprefixer({
          browsers: ['last 2 version', 'ie 8', 'ie 9']
        }))
        .pipe(gulp.dest(distPath))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest(distPath))
        .pipe(breload({stream:true}));
});
//监听sass文件
gulp.task('watchsass',['sass'],function(){
    gulp.watch('src/sass/**/*.*',['sass']);
});


//压缩图片，并输出到dist
gulp.task('images',function(){
    return gulp.src('src/images/*.*')
        .pipe(changed('dist/images/'))
        .pipe(imagemin({
            progressive:true
        }))
        .pipe(gulp.dest('dist/images'));
});

//监听images
gulp.task('watchimages',['images'],function(){
    var watcher = gulp.watch('src/images/*.*',['images']);
    //watcher.on('change',breload);
});

gulp.task('copy',function(){
    gulp.src('src/fonts/**/*')
        .pipe(changed('dist/fonts/'))
        .pipe(gulp.dest('dist/fonts/'));
    gulp.src('src/**/*.html')
        .pipe(changed('dist/'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('watchcopy',['copy'],function(){
    var watcher = gulp.watch(['src/fonts/**/*','src/**/*.html'],['copy','reload']);
    //watcher.on('change',breload);
});

//强制刷新页面 
gulp.task('reload',function(){
    breload();
});
//在命令行使用 gulp 启动任务
//gulp.task('default', ['css', 'js', 'images', 'less', 'sass', 'copy', 'watchjs', 'watchcss', 'watchless', 'watchsass', 'watchimage', 'browser-sync']);
