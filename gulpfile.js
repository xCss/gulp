var gulp = require('gulp'),                         //gulp
    csso = require('gulp-csso'),                    //css压缩
    jshint = require('gulp-jshint'),                //js检查
    uglify = require('gulp-uglify'),                //js压缩
    concat = require('gulp-concat'),                //文件合并
    clean = require('gulp-clean'),                  //清空文件夹
    rename = require('gulp-rename'),                //文件重命名
    rev = require('gulp-rev'),                      //更改版本名
    revCollector = require('gulp-rev-collector');   //gulp-rev的插件，用于更改html里的资源引用路径



var browserSync = require('browser-sync');
//var minifycss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');

var breload = browserSync.reload;
/**
 * 所有目录
 * @basePath browser-sync服务器默认目录
 */
var basePath = './dist',
    distPath = basePath,
    srcPath = './src',
    revPath = './rev/**/*.json';


gulp.task('clean',function(){
    return gulp.src(basePath,{read:false})
        .pipe(clean());
});

gulp.task('js',function(){
    return gulp.src(srcPath + '/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest(distPath))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./rev/js'));
});

gulp.task('css',function(){
    return gulp.src(srcPath+'/**/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 version', 'ie 8', 'ie 9']
        }))
        .pipe(csso())
        .pipe(rename({suffix:'.min'}))
        .pipe(rev())
        .pipe(gulp.dest(distPath))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./rev/css')); 
});

gulp.task('images',function(){
    return gulp.src(srcPath + '/images/*.*')
        .pipe(rev())
        .pipe(gulp.dest(distPath))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./rev/images'));
});


gulp.task('rev',function(){
    return gulp.src([revPath, srcPath + '/**/*.html'])
        .pipe(revCollector({
            replaceReved:true
        }))
        .pipe(gulp.dest(distPath));
});


    

gulp.task('test',function(){
    console.log('Tt works!');
});

//单独打开服务
gulp.task('s',function(){
    browserSync({
        files:"**",
        server:{
            baseDir:basePath
        }
    });
});


gulp.task('server',['build'],function(){
    browserSync({
        files:"**",
        server:{
            baseDir:basePath
        }
    });
});

gulp.task('default',['server']);

gulp.task('build',['clean','js','css','images','rev','copy']);




//复制字体
gulp.task('copy',function(){
    return gulp.src(srcPath + '/fonts/**')
        .pipe(gulp.dest(distPath + '/fonts/'));
});


//强制刷新页面 
gulp.task('reload',function(){
    breload();
});
//监听
// gulp.task('watch',function(){
//     gulp.watch(jsSrcPath,['js','reload']);
//     gulp.watch(cssSrcPath,['css']);
//     gulp.watch(lessSrcPath,['less']);
//     gulp.watch(sassSrcPath,['sass']);
//     gulp.watch(imagesSrcPath,['images']);
//     gulp.watch([fontsSrcPath,htmlSrcPath],['copy','reload']);
// });





