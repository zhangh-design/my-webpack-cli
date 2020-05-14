'use strict'
/**
 * webpack 打包自定义配置文件
 */

module.exports = {
  isUsedPr2Rem: false, // 如果需要使用相对单位那么设置为 true（会自动使用 vw+rem+postcss 方案，css中的单位就要使用 pr 而不是 px ），false 表示 px
  pr2RemRootValue: '750', // 设计图为750px（默认值为750px对应移动端设计图），如果isUsedPr2Rem: false 则此参数设置了也不会使用
  title: 'Hello Webpack', // 单页模式 html 的标题
  isAppHash: false, // 是否清除整个应用级别缓存 默认 false（如果为 true 将在项目文件内容发生改变的情况下构建后将所有文件的缓存失效，导致用户的本地缓存将失效必须重新下载所有文件）
  isMpa: false, // 是否多页面模式，默认 false 表示单页模式
  isProdConsoleLog: true, // prod 模式下是否过滤掉 console 日志
  ieDynamicImport: false, // 针对 ie 浏览器是否需要支持 动态import 导入模块的功能（对 chrome Firefox Edge 无影响），如果在 .babelrc 中 browsers 不需要支持 ie 环境那么这里配置 false 即不用考虑任何 ie 浏览器，如果你的业务代码里没有动态import那么也设置 false 即可
  isBundleAnalyzer: true, // 是否使用 webpack-bundle-analyzer 进行打包分析
  // isDevCssOneStyle: false, // dev 模式下最终的 css 是否要合并到一个 <style></style> 标签内，默认 false 每一次处理引入的样式文件都会在 DOM 上创建一个 <style> 标签（此项配置针对 style-loader）
  isProdCssInline: false, // prod 模式下最终的 css 是否要内联到 style 标签内，默认 false 使用 link 引入
  isProdCssEntry: false, // MiniCssExtractPlugin 和 entry 入口文件结合打包 css 文件，一个入口 entry 对应一个 css 文件，默认false 表示所有引入的 css 最终都打包到一个 css 文件里面
  isDevFriendlyErrors: true, // dev 模式下 webpack-dev-server 的打包输出的信息是否由 friendly-errors-webpack-plugin 提供（没有打包信息），false 的话可以输出构建时的打包信息
  isCssSprites: function (isDev) {
    return !isDev
  }, // 是否打开自动合成雪碧图的功能（开发环境建议设置 false ），true 打开 false 关闭
  useAlias: {
    '@service': './src/service',
    '@config': './src/config',
    '@assets': './src/assets',
    '@plugins': './src/plugins'
  }, // 自定义 alias 别名
  routerWhiteList: ['helper'], // 白名单路由
  // 配置通过 html-webpack-externals-plugin 加载远程 CDN 资源上的js文件，打包构建时 webpack 会通过分析 html-webpack-externals-plugin 中的模块将这些模块不打包到最终的 bundle 里面减小体积
  // 需要有外网
  cdnJsArray: [
    {
      module: 'nprogress',
      entry: 'https://cdn.bootcdn.net/ajax/libs/nprogress/0.2.0/nprogress.js',
      global: 'NProgress'
    },
    {
      module: 'jquery',
      entry: 'https://cdn.bootcss.com/jquery/3.5.0/jquery.min.js',
      global: 'jQuery', // import jquery from 'jquery'
      alias: 'jq' // 别名 import $ from 'jq'
    },
    {
      module: 'axios',
      entry: 'https://cdn.bootcss.com/axios/0.18.0/axios.min.js',
      global: 'axios'
    }
  ],
  // 指定的依赖库不会被 splitChunks 分割到 otherDependencies 缓存组内
  removeOtherDependenciesCacheGroupsLibs: ['@babel/runtime', '@babel/polyfill', '@babel/runtime-corejs3', 'axios-api-query', 'jquery', 'vue-router', 'vue', 'vuex', 'fast-element-ui', 'core-js', 'axios'],
  // 全局提供帮助类库和工具函数（暴露全局变量），会增加构建 bundle 的体积不要配置太多
  providePlugin: {
    // $: 'jquery',
  }
}
