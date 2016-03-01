# Gulp + Browser-sync 自动化工程构建工具

1. 使用 `browser-sync` 自动刷新页面  
2. `gulp server` 默认打开所有监听  
3. 默认首页是 `dist/index.html` ，若要修改，请直接修改变量 `basePath` 
4. 使用 `gulp-rev-collector` 添加版本号  

-------------------------------  

### 1.克隆仓库到本地
> git clone git@github.com:Eary/gulp.git -b small

### 2.进入`gulp`目录
> cd gulp

### 3.安装必要插件
> npm install

### 4.启动服务
> gulp watch

然后，就可以访问 `localhost:3000` 查看网页了  
  
## 目录结构  
```
src             #源码目录
  |--js
  |--css
  |--fonts
  |--images
  |--index.html
dist            #输出目录
  |--js
  |--css
  |--fonts
  |--images
  |--index.html
```


## 所有命令
```
gulp                    //默认调用 gulp build
gulp js                 //压缩 js 文件，并输出到 dist/js/
gulp css                //压缩 css 文件，并输出到 dist/css/
gulp images             //复制并压缩图片，并输出到 dist/images/
gulp copy               //复制字体文件到 dist/
gulp watch              //监听所有文件，并启动服务
gulp build              //编译 src/ 目录下的所有文件并输出到 dist/ 目录，不启动监听
gulp reload             //强制刷新页面
gulp clean              //清空 dist/ 目录
gulp rev                //添加MD5指纹
```



## 以下项目是采用此工具构建  
1. [Demo](dist/index.html)  
2. [Treasure](https://github.com/eary/treasure)  