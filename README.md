# 安装

1. `npm install --global gulp-cli` 全局安装gulp
2. `npm install`
3. `npm run dev` 开发模式命令
4. `npm run build` 生产环境打包命令

不同的环境对应的NODE_ENV值不同，具体查看package.json文件。 开发时可根据环境不同做不同的处理，比如设置不同的变量
只有配置文件可读取到NODE_ENV值，src目录下则读取不到，需要使用插件

## 文件目录

```

/
|
|- src/
|   |- css/
|   |    
|   |- images/
|   |     
|   |- js/
|   |    
|   |- **.html
|   |
|- bulid/  gulp环境配置文件
|   |
|   |- config.js 源码和打包路径配置文件
|   |
|
|- gulpfile.babel.js gulp主文件，ES6模式运行命令所需文件

```

## 说明项

1. 配置定义文件夹时一定要注意src下面文件夹要和打包输出文件夹(dist)对应 
比如src里面图片文件images夹对应dist里面images，这样做是为了方便 
如果dist图片文件夹是img，src下面图片文件夹是images，如果引入的图片路径写的是images，那么打包出来的文件里面图片路径就错了

2. 生产环境静态资源文件名带md5值

3. 任务顺序很重要，html任务要先执行，否则打包出的html文件里面引入的css,js,img文件不带MD5
同理css文件里面引入了图片文件，css任务需要先于image任务执行（上面一点相当于废话了）
