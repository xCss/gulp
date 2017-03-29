var gulp = require('gulp'), //gulp
    del = require('del'), //删除文件
    rev = require('gulp-rev'), //更改版本名
    sass = require('gulp-sass'), //编译sass
    csso = require('gulp-csso'), //css压缩
    clean = require('gulp-clean'), //清空文件夹
    filter = require('gulp-filter'), //过滤筛选指定文件
    concat = require('gulp-concat'), //合并文件
    cached = require('gulp-cached'), //缓存当前任务中的文件，只让已修改的文件通过管道
    jshint = require('gulp-jshint'), //js检查
    uglify = require('gulp-uglify'), //js压缩
    concat = require('gulp-concat'), //文件合并
    rename = require('gulp-rename'), //文件重命名
    imagemin = require('gulp-imagemin'), //图片压缩
    browserSync = require('browser-sync'), //自动刷新
    autoprefixer = require('gulp-autoprefixer'), //添加浏览器私有前缀
    revCollector = require('gulp-rev-collector'); //gulp-rev的插件，用于更改html里的资源引用路径

// var paths = {
//     dirs:{
//         build:''
//     },
//     sass:'./src/sass/*.sass',
//     less:'./src/less/*.less',
//     css:'./src/css/*.css',
//     js:'./src/js/*.js'

// }


var breload = browserSync.reload;
/**
 * 所有目录
 * @basePath browser-sync服务器默认目录
 */
var basePath = './dist',
    distPath = basePath,
    srcPath = './src',
    revPath = './rev/**/*.json';

gulp.task('clean', function() {
    return gulp.src(basePath, { read: false })
        .pipe(clean());
});

gulp.task('js', function() {
    return gulp.src(srcPath + '/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(rename({ suffix: '.min' }))
        //.pipe(uglify())
        //.pipe(rev())
        .pipe(gulp.dest(distPath))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./rev/js'));
});

gulp.task('css', function() {
    return gulp.src(srcPath + '/css/*.css')
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        //.pipe(gulp.dest(distPath + '/css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(csso())
        //.pipe(rev())
        .pipe(gulp.dest(distPath + '/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./rev/css'));
});

gulp.task('scss', function() {
    return gulp.src(srcPath + '/scss/*.scss')
        .pipe(sass())
        .on('error', function(e) { console.log(e); })
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest(srcPath + '/css'))
        .pipe(breload({ stream: true }));
});

gulp.task('images', function() {
    return gulp.src(srcPath + '/images/*.*')
        .pipe(cached('images'))
        .pipe(gulp.dest(distPath + '/images/'));
});


gulp.task('rev', function() {
    return gulp.src([revPath, srcPath + '/**/*.html'])
        .pipe(revCollector({
            replaceReved: true
        }))
        .pipe(gulp.dest(distPath));
});

gulp.task('build', ['clean', 'css', 'js', 'images', 'copy'], function() {
    gulp.start('rev');
});

gulp.task('default', ['clean'], function() {
    gulp.start('build');
});

gulp.task('watch', function() {

    gulp.watch(srcPath + '/images/*', ['images']);
    gulp.watch(srcPath + '/**/*.html', ['rev'], breload);
    gulp.watch(srcPath + '/**/*.js', ['js', 'rev'], breload);
    gulp.watch(srcPath + '/**/*.css', ['css', 'rev'], breload);
    //gulp.watch(srcPath + '/less/*.less',['less','mincss','rev'],breload);

    browserSync({
        files: '**',
        server: {
            baseDir: basePath // 在 dist 目录下启动本地服务器环境，自动启动默认浏览器
        }
    });

});


//单独打开服务
gulp.task('s', function() {
    browserSync({
        files: "**",
        server: {
            baseDir: srcPath
        }
    });

    gulp.watch(srcPath + '/**/*.html', breload);
    gulp.watch(srcPath + '/**/*.js', breload);
    gulp.watch(srcPath + '/scss/*.scss', ['scss']);
});

//复制字体
gulp.task('copy', function() {
    return gulp.src(srcPath + '/fonts/**')
        .pipe(gulp.dest(distPath + '/fonts/'));
});


//强制刷新页面 
gulp.task('reload', function() {
    breload();
});