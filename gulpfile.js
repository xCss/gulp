var gulp = require('gulp');
var less = require('gulp-less');
//var gutil = require('gulp-util');
var clean = require('gulp-clean');
var cache = require('gulp-cache');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var filter = require('gulp-filter');
var sass = require('gulp-ruby-sass');
var rev = require('gulp-rev-append');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync');
var minifycss = require('gulp-minify-css');
var watchPath = require('gulp-watch-path');
var autoprefixer = require('gulp-autoprefixer');

var breload = browserSync.reload;
/**
 * 所有链接
 * @type {String}
 */
var basePath = './dist';
var jsSrcPath = 'src/js/**/*.js';
var jsDistPath = 'dist/js/';
var cssSrcPath = 'src/css/**/*.css';
var cssDistPath = 'dist/css/';
var lessSrcPath = 'src/less/**/*.less';
var lessDistPath = 'dist/css/';
var sassSrcPath = 'src/sass/**/*.*';
var sassDistPath = 'dist/css/';
var imagesSrcPath = 'src/images/**/*.*';
var imagesDistPath = 'dist/images/';
var fontsSrcPath = 'src/fonts/**/*.*';
var fontsDistPath = 'dist/font/';
var htmlSrcPath = 'src/**/*.html';
var htmlDistPath = 'dist/';
    

gulp.task('test',function(){
    console.log('Tt works!');
});

gulp.task('server',['css','js','images','less','sass','copy','watch'],function(){
    browserSync({
        files:"**",
        server:{
            baseDir:basePath
        }
    });
});

gulp.task('build',['js','css','copy','less','sass']);

gulp.task('clean',function(){
    gulp.src('../gulp/dist',{read:false}).pipe(clean({force:true}));
    gulp.src('../gulp/.sass-cache',{read:false}).pipe(clean({force:true}));
});

//压缩js，并输出到dist
gulp.task('js',function(){
    return gulp.src(jsSrcPath)
        .pipe(changed(jsDistPath))
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(gulp.dest(jsDistPath))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        //.pipe(concat('common.js'))
        .pipe(gulp.dest(jsDistPath));
});
//压缩css，并输出到dist
gulp.task('css',function(){
    return gulp.src(cssSrcPath)
        .pipe(changed(cssDistPath))
        .pipe(autoprefixer({
            browsers: ['last 2 version', 'ie 8', 'ie 9']
        }))
        .pipe(gulp.dest(cssDistPath))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest(cssDistPath))
        .pipe(breload({stream:true}));
});

//编译less
gulp.task('less',function(){
    return gulp.src(lessSrcPath)
        .pipe(changed(lessDistPath))
        .pipe(autoprefixer({
            browsers: ['last 2 version', 'ie 8', 'ie 9']
        }))
        .pipe(less())
        .pipe(gulp.dest(lessDistPath))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest(lessDistPath))
        .pipe(breload({stream:true}));
});

//编译sass
gulp.task('sass',function(){
    return sass(sassSrcPath)
        .on('error', function (err) {
            console.error('Error!', err.message);
        })
        .pipe(autoprefixer({
          browsers: ['last 2 version', 'ie 8', 'ie 9']
        }))
        .pipe(gulp.dest(sassDistPath))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest(sassDistPath))
        .pipe(breload({stream:true}));
});

//压缩图片，并输出到dist
gulp.task('images',function(){
    return gulp.src(imagesSrcPath)
        .pipe(cache(imagemin({optimizationLevel:3,progressive:true,interlaced:true})))
        .pipe(gulp.dest(imagesDistPath));
});

//复制字体和html文件
gulp.task('copy',function(){
    gulp.src(fontsSrcPath)
        .pipe(changed(fontsDistPath))
        .pipe(gulp.dest(fontsDistPath));
    gulp.src(htmlSrcPath)
        .pipe(changed(htmlDistPath))
        .pipe(rev())
        .pipe(gulp.dest(htmlDistPath));
});


//强制刷新页面 
gulp.task('reload',function(){
    breload();
});
//监听
gulp.task('watch',function(){
    gulp.watch(jsSrcPath,['js','reload']);
    gulp.watch(cssSrcPath,['css']);
    gulp.watch(lessSrcPath,['less']);
    gulp.watch(sassSrcPath,['sass']);
    gulp.watch(imagesSrcPath,['images']);
    gulp.watch([fontsSrcPath,htmlSrcPath],['copy','reload']);
});

gulp.task('default',['server']);

