# 安装

1. `npm install --global gulp-cli` 全局安装gulp
2. `npm install`
3. `npm run dev` 开发模式命令
4. `npm run build` 生产环境打包命令 `npm run build:test` 测试服打包命令

不同的环境对应的NODE_ENV值不同，具体查看package.json文件。 开发时可根据环境不同做不同的处理，比如设置不同的变量

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
|   |- gulpfile.dev.js 开发模式
|   |
|   |- gulpfile.prod.js 生产模式
|
|- gulpfile.babel.js gulp主文件，ES6模式运行命令所需文件

```

## 说明项

1. 配置定义文件夹时一定要注意src下面文件夹要和打包输出文件夹(dist)对应 
比如src里面图片文件images夹对应dist里面images，这样做是为了方便 
如果dist图片文件夹是img，src下面图片文件夹是images，如果引入的图片路径写的是images，那么打包出来的文件里面图片路径就错了

2. 生产环境静态资源文件名带md5值，为区分开发和生产环境，这2种环境的配置文件放在build文件夹内

3. 引入的本地文件路径最好使用 `./css/xx.css`这种形式代替`css/xx.css`， 否则生成的文件名可能不带md5
*以上原因可能是任务执行顺序不对*

4. 任务顺序很重要，html任务要先执行，否则打包出的html文件里面引入的css,js,img文件不带MD5
同理css文件里面引入了图片文件，css任务需要先于image任务执行（上面一点相当于废话了）
