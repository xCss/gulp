# Gulp + Browser-sync 

###1.克隆仓库到本地
> git clone git@github.com:Eary/gulp.git 

###2.进入`gulp`目录
> cd gulp

###3.安装必要插件
> npm install

###4.启动服务
> gulp server

然后，就可以访问 `localhost:3000` 查看网页了
  默认首页是(dist/index.html)[dist/index.html]



##所有命令
```
 1.gulp test            #这个不用说
 2.gulp server          #启动服务，并监听所有文件改变
 4.gulp js              #压缩 js 文件，并输出到 dist/js
 5.gulp css             #压缩 css 文件，并输出到 dist/css
 6.gulp less            #编译并压缩 less 文件，输出到 dist/css
 7.gulp sass            #编译并压缩 sass 文件，输出到 dist/css
 8.gulp images          #压缩图片，输出到 dist/images
 9.gulp copy            #复制 *.html 和字体文件到 dist/
 10.gulp watchjs        #监听 src/js/ 目录
 11.gulp watchcss       #监听 src/css/ 目录
 12.gulp watchless      #监听 src/less/ 目录
 13.gulp watchsass      #监听 src/sass/ 目录
 14.gulp watchimages    #监听 src/images/ 目录
 15.gulp watchcopy      #监听 src/*.html 文件和 src/fonts/ 目录

```