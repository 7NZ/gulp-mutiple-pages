import gulp from 'gulp';
import sass from 'gulp-sass'; // sass 预处理css
import babel from 'gulp-babel'; // babel转 es6语法
import uglify from 'gulp-uglify';  // 压缩js
import imagemin from 'gulp-imagemin'; // 压缩图片
import cleanCSS from 'gulp-clean-css'; // 压缩css
import livereload from 'gulp-livereload';  // 热加载
import webserver from 'gulp-webserver';  // 本地服务
import md5 from 'gulp-md5-plus'; // 生成的文件，文件名带md5
import autoprefixer from 'gulp-autoprefixer';

import del from 'del';

import config from './build/config.js';

let outputPath = config.outputPath;
let paths = config.paths;
const isDev = process.env.NODE_ENV === 'development';


if(process.env.NODE_ENV === 'development') {
  console.log('in development');
}

/*
 * For small tasks you can export arrow functions
 */
export const clean = () => del([ outputPath , './manifest.json']);


// 复制文件
export function copyFiles(){
  return gulp.src(
    config.copyTarget, {
      base: 'src'   //如果设置为 base: 'js' 将只会复制 js目录下文件, 其他文件会忽略
    }
  ).pipe(gulp.dest( config.outputPath ));
}

// 处理html
export function htmls() {
  return gulp.src(paths.htmls.src)
    .pipe(gulp.dest(paths.htmls.dest))
}

// css
export function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(cleanCSS())
    .pipe(
      isDev
      ? gulp.dest(paths.styles.dest)
      : md5(10, outputPath + '/*.html', {
        mappingFile: 'manifest.json'
      })
    )
    .pipe(gulp.dest(paths.styles.dest));
}

// js
export function scripts() {
  return gulp.src(paths.scripts.src, { sourcemaps: true })
    .pipe(babel())
    .pipe(uglify())
    .pipe(
      isDev
      ? gulp.dest(paths.scripts.dest)
      : md5(10, outputPath + '/*.html', {
        mappingFile: 'manifest.json'
      })
    ).pipe(gulp.dest(paths.scripts.dest));
}

// 图片
export function images() {
  return gulp.src(paths.images.src, {since: gulp.lastRun(images)})
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(
      isDev
      ? gulp.dest(paths.images.dest)
      : md5(10, [outputPath + '/css/**/*.css', outputPath + '/*.html'], {
        mappingFile: 'manifest.json'
      })
    ).pipe(gulp.dest(paths.images.dest));
}

export function webServer(){ // 本地服务
  return gulp.src( './' + outputPath ) // 服务器目录（.代表根目录）
    .pipe(webserver({ // 运行gulp-webserver
      port: 8031,
      livereload: true, // 启用LiveReload
      open: false, // 服务器启动时是否自动打开网页
      proxies: [ // 代理
        {
          source: '/mobao',
          target: 'http://test.mobaotec.com/mobao',
          // options: { headers: {'ABC_HEADER': 'abc'} }
        }
      ]
    }));
}

export function watchFiles(){ // 监听文件
  gulp.watch(paths.htmls.src, gulp.series(htmls));
  gulp.watch(paths.scripts.src, gulp.series(scripts));
  gulp.watch(paths.styles.src, gulp.series(styles));
  gulp.watch(paths.images.src, gulp.series(images));
  gulp.watch(config.copyTarget, gulp.series(copyFiles));
}

const dev = gulp.series(
  clean, 
  htmls,
  styles, 
  gulp.parallel(
    images, 
    scripts, 
    copyFiles
  ), 
  webServer, 
  watchFiles 
);

const build = gulp.series(
  clean, 
  htmls, // 顺序很重要，html任务要先执行，否则打包出的html文件里面引入的css,js,img文件不带MD5
  styles, // 同上，css文件里面引入了图片文件，因此需要先执行
  gulp.parallel(
    images, 
    scripts, 
    copyFiles
  ),
);

export { build };
/*
 * Export a default task
 */
export default dev;