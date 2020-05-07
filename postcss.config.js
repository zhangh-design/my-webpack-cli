const postcssSprites = require('postcss-sprites')
const pr2rem = require('postcss-plugin-pr2rem')
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
  cssSpritePlugin.push(
    postcssSprites({
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
    })
  )
}
const pr2remPlugin = []
if (fastConfig.isUsedPr2Rem) {
  // font-size: 14pr会不转义，因为 font-size 放在了 propBlackList 黑名单中
  // 7.5pr 转换后就是 1rem 然后 1rem 就会等于 font-siz e的 1vw，1vw 等于 布局视口宽度（document.clientWidth）/100=1%
  //  <style>.frame {width: 7.5pr;height: 50pr;}.frame span {font-size: 14px; /* 14rem */}</style>
  // pr转rem，不直接使用px转rem防止我们可能有时候确实要使用px比如font-size
  const pr2remConfig = {
    // 设计图为1242px，一份 root 对应着 rootWidth/100=12.42px
    // （这里是恒等于1242px 来做rem和pr之间的转换定义，也就是css代码中的计算都是按照12.42）1rem=12.42pr （比如：50pr就相当于4rem）， 1vw = 布局视口宽度（document.clientWidth）/100=1% （比如：布局视口宽度是351px那么1vw就是3.5px，那么在根节点html的fons-size是1vw的情况下1rem也就是3.5px）
    // rootValue: 12.42,
    // 设计图为750px，一份 root 对应着 rootWidth/100=7.5px
    rootValue: fastConfig.pr2RemRootValue
      ? fastConfig.pr2RemRootValue / 100
      : 7.5, // 1rem=7.5pr
    // 这里是基本单位，前面设置了1vw
    unitPrecision: 1,
    propWhiteList: [],
    propBlackList: ['font-size'], // 黑名单 （font-size 我们可能需要直接设置 rem、vw或者px）
    selectorBlackList: [],
    ignoreIdentifier: '00',
    replace: true,
    mediaQuery: false,
    minPixelValue: 0
  }
  pr2remPlugin.push(pr2rem(pr2remConfig))
}

module.exports = {
  plugins: [
    // @import 引入的 scss、less、css 样式文件再次调用执行预处理器 Loader 编译引入的文件
    // css-loader 的 importLoaders 配置参数也是用于配置 css-loader 作用于 @import 的资源之前有多少个 loader，但 importLoaders 需要指定 @import 的资源之前的 loader 个数
    // require('postcss-import'), // 我配置了 css-loader 的 importLoaders 所以这里就注释了
    // 根据 .browserslistrc 自动添加浏览器厂商前缀（webkit、moz、ms）
    require('autoprefixer'),
    require('cssnano') // 去除空格、注释、智能压缩代码（postcssSprites 会把 css 代码中已经注释的背景图也进行合成，所以要提前把 css 去除注释）
    // pr2rem(pr2remConfig)
  ].concat(cssSpritePlugin, pr2remPlugin)
}
