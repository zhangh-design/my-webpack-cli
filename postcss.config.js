const postcssSprites = require('postcss-sprites')
const fastConfig = require('./fast.config.js')

function spritesGroupBy (image) {
  // background: url(../../assets/sprites-img/login/10.png) no-repeat;
  const groups = /\/assets\/sprites-img\/(.*?)\/.*/gi.exec(image.url)
  if (!groups) {
    return Promise.reject(new Error())
  }
  return Promise.resolve(groups[1])
}

// CSS Sprite 雪碧图
const cssSpritePlugin = []
const isDev = process.env.NODE_ENV === 'development'
if (fastConfig.isCssSprites(isDev)) {
  cssSpritePlugin.push(postcssSprites({
    spritePath: 'sprites', // 雪碧图合并后存放地址，在通过 image-webpack-loader 压缩图片 和 url-loader 把处理压缩后的图片放到 dist 目录
    filterBy: function (image) {
      // 过滤一些不需要合并的图片，返回值是一个 promise，默认有一个 exist 的 filter
      if (image.url.indexOf('/assets/sprites-img/') === -1) {
        return Promise.reject(new Error())
      }
      return Promise.resolve()
    },
    groupBy: function (image) {
      // 将图片分组，可以实现按照文件夹生成雪碧图，放置单张雪碧图过大
      return spritesGroupBy(image)
    }
  }))
}
module.exports = {
  plugins: [
    // @import 引入的 scss、less、css 样式文件再次调用执行预处理器 Loader 编译引入的文件
    // css-loader 的 importLoaders 配置参数也是用于配置 css-loader 作用于 @import 的资源之前有多少个 loader，但 importLoaders 需要指定 @import 的资源之前的 loader 个数
    // require('postcss-import'), // 我配置了 css-loader 的 importLoaders 所以这里就注释了
    // 根据 .browserslistrc 自动添加浏览器厂商前缀（webkit、moz、ms）
    require('autoprefixer'),
    require('cssnano') // 去除空格、注释、智能压缩代码（postcssSprites 会把 css 代码中已经注释的背景图也进行合成，所以要提前把 css 去除注释）
  ].concat(cssSpritePlugin)
}
