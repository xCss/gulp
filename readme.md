# Gulp + Browser-sync 自动化工程构建工具

1. 使用 `changed` 检测文件是否有修改  
2. 使用 `browser-sync` 自动刷新页面  
3. `gulp server` 默认打开所有监听  
4. 默认首页是 `dist/index.html` ，若要修改，请直接修改变量 `basePath` 
5. 使用 `gulp-rev-append` 添加版本号  
    `!!注:` 请在html文档中要添加版本号的地方加上`?rev=@@hash`  

-------------------------------  

###1.克隆仓库到本地
> git clone git@github.com:Eary/gulp.git 

###2.进入`gulp`目录
> cd gulp

###3.安装必要插件
> npm install

###4.启动服务
> gulp server

然后，就可以访问 `localhost:3000` 查看网页了  
  
##目录结构  
```
src             #源码目录
  |--js
  |--css
  |--less
  |--sass
  |--fonts
  |--images
  |--index.html
dist            #源码目录
  |--js
  |--css
  |--fonts
  |--images
  |--index.html
```


##所有命令
```
gulp                    //默认调用 gulp server
gulp js                 //压缩 js 文件，并输出到 dist/js/
gulp css                //压缩 css 文件，并输出到 dist/css/
gulp less               //编译并压缩 less 文件，输出到 dist/css/
gulp sass               //编译并压缩 sass 文件，输出到 dist/css/
gulp images             //压缩图片，输出到 dist/images/
gulp copy               //复制 *.html 和字体文件到 dist/
gulp test               //这个不用说
gulp server             //启动服务，并监听所有文件
gulp watch              //监听所有文件
gulp build              //编译 src/ 目录下的所有文件并输出到 dist/ 目录，不启动监听
gulp reload             //强制刷新页面
gulp clean              //清空 dist/ 目录
gulp s                  //单独打开服务，不执行任何[编译/压缩/监听]操作(此命令在[编译/压缩]完成之后)
```



##已知 BUG  
- [ ] `gulp-rev-append` 在\<head\>中偶尔不工作

## 以下项目是采用此工具构建  
1. [Demo](dist/index.html)  
2. [Treasure](https://github.com/eary/treasure)  