const outputPath = 'dist';

const config = {
  outputPath: outputPath,
  // 需要拷贝的文件
  copyTarget: ['./src/js/lib/**/*','./src/js/*.min.js','./src/css/**/*.min.css', './src/css/font/**/*'],
  paths: {
    htmls: {
      src: 'src/*.html',
      dest: outputPath + '/'
    },
    styles: {
      src: 'src/css/**/*.scss',
      dest: outputPath + '/css/'
    },
    scripts: {
      src: ['src/js/*.js','!src/js/*.min.js'], // 忽略带.min的js文件
      dest: outputPath + '/js/'
    },
    images: {
      src: 'src/images/**/*.{jpg,jpeg,png,svg,gif}',
      dest: outputPath + '/images/'
    }
  }
}

export default config;