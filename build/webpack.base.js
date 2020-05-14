'use strict'
// const packageConfig = require('../package.json')
const config = require('../config/index.js')
const fastConfig = require('../fast.config.js')
const utils = require('../build/utils.js')
const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const createVueLoaderConfig = require('./vue-loader.conf.js')
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const ieDynamicImportModule = function () {
  return fastConfig.ieDynamicImport ? utils.getIEDynamicImportModule() : {}
}

const useAlias = {}
if (fastConfig.useAlias) {
  for (const [key, value] of Object.entries(fastConfig.useAlias)) {
    useAlias[key] = resolve(value)
  }
}
const isDev = process.env.NODE_ENV === 'development' // 开发环境

module.exports = {
  // 默认将 entry 的入口起点指向根目录
  context: path.resolve(__dirname, '../'),
  // 配置了 context 所以路径写成 ./src 当前目录下即可
  entry: {
    ...ieDynamicImportModule(),
    app: './src/main.js'
    // 如果是 webpack < 4 的版本，可以在 entry 里配置 vendor 来分离第三方类库，需要结合 CommonsChunkPlugin 一起配置使用
    // vendor: ['lodash', 'moment', 'vue']
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    libraryTarget: 'umd', // 支持 script标签、AMD、commonJs 引入
    libraryExport: 'default',
    publicPath:
      process.env.NODE_ENV === 'production'
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath,
    hashDigestLength: 8 // 生成 bundle 文件 hash 取8位（对 url-loader和file-loader 的 hash 无效）
  },
  resolve: {
    // 自动解析确定的扩展（逻辑性文件，资源文件还是建议显示引入）配置太多对性能有损耗
    // 要确保同一个目录下面没有重名的文件，如果存在的话，还是要写全路径
    extensions: ['.js', '.vue'],
    // 创建 import 或 require 的别名，来确保模块引入变得更简单
    alias: {
      // 设置 vue 的别名为精确匹配，文件中就可以这样使用 import Vue from 'vue'（from 后面的 'vue' 就代表这里的配置）
      vue$:
        process.env.NODE_ENV === 'production'
          ? resolve('./node_modules/vue/dist/vue.runtime.min.js')
          : resolve('./node_modules/vue/dist/vue.runtime.js'),
      '@': resolve('./src'),
      ...useAlias
    },
    // 告诉 webpack 解析第三方模块时应该搜索的目录，默认 node_modules
    // modules: [path.resolve(__dirname, '../node_modules')], ie 11 环境中因为这样配置找不到 iterator.js 和 Promise.js 的babel支持文件
    modules: [resolve('src'), 'node_modules'],
    // 解析目录时要使用的文件名（这个配置项不常用，因为也是对性能有损耗）
    // mainFiles: ['index', 'test'],
    // 对应第三方包 package.json 中的 main 属性字段，意思是通过 main 属性指定的文件来导入模块
    mainFields: ['main', 'module']
  },
  // 抽离库不打包到构建文件中减小构建包体积，但要通过 script 标签在外部引入
  // externals: fastConfig.externals,
  module: {
    // noParse: '/jquery|lodash/', // 构建时不去解析三方库
    // noParse: /node_modules\/(element-ui\.js)/,
    rules: [
      {
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre' // 在使用 babel-loader 和 vue-loader 之前先使用 eslint-loader
      },
      {
        test: /\.jsx?$/, // x? 表示同时使用 babel-loader 解析 js 和 jsx 文件
        // exclude: /node_modules/,
        exclude: file => (
          /node_modules/.test(file) &&
          !/\.vue\.js/.test(file)
        ), // https://vue-loader.vuejs.org/zh/migrating.html#%E4%BB%8E%E4%BE%9D%E8%B5%96%E4%B8%AD%E5%AF%BC%E5%85%A5%E5%8D%95%E6%96%87%E4%BB%B6%E7%BB%84%E4%BB%B6
        include: [resolve('src'), resolve('test')],
        loader: 'babel-loader',
        options: {
          cacheDirectory: true // 开启缓存（node_modules/.cache/babel-loader）提升打包速度，第一次编译无效后面会提升速度
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: createVueLoaderConfig(isDev)
      },
      {
        test: /\.(png|jpe?g|gif|svg|blob)(\?.*)?$/,
        // 压缩图片
        loader: 'image-webpack-loader',
        exclude: [resolve('src/assets/exclude-img'), resolve('src/assets/sprites-img')], // 排除某个文件下的图片不进行压缩处理
        // 通过enforce: 'pre'我们提高了 img-webpack-loader 的优先级，保证在url-loader、file-loader和svg-url-loader之前就完成了图片的优化。
        enforce: 'pre'
      },
      {
        test: /\.(png|jpe?g|gif|svg|blob)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          esModule: false, // 默认true（设置为 true img中的 src 会是对象 <img src="[object Module]"/>）
          limit: 8 * 1024, // 8kb
          context: path.resolve(__dirname, '../src'),
          name: utils.assetsPath('img/[path][name]-[hash:8].[ext]'),
          publicPath:
            process.env.NODE_ENV === 'production'
              ? config.build.urlLoaderPublicPath
              : config.dev.urlLoaderPublicPath // http://www.baidu.com/
        },
        // 排除合并后的雪碧图目录，防止雪碧图小于 limit 值而被转换成 base64 的形式
        exclude: [resolve('sprites'), resolve('src/assets/sprites-img')]
      },
      {
        test: /\.(png|jpe?g|gif|svg|blob)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          esModule: false, // 默认true（设置为 true img中的 src 会是对象 <img src="[object Module]"/>）
          context: path.resolve(__dirname, '../src'),
          name: utils.assetsPath('img/[path][name]-[hash:8].[ext]'),
          publicPath:
            process.env.NODE_ENV === 'production'
              ? config.build.urlLoaderPublicPath
              : config.dev.urlLoaderPublicPath // http://www.baidu.com/
        },
        // 合并后的雪碧图使用 file-loader 来处理，防止雪碧图小于 url-loader 的 limit 值然后又被转换成 base64 的形式
        include: [resolve('sprites'), resolve('src/assets/sprites-img')]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          context: path.resolve(__dirname, '../src'),
          name: utils.assetsPath('media/[path][name]-[hash:8].[ext]'),
          publicPath:
            process.env.NODE_ENV === 'production'
              ? config.build.urlLoaderPublicPath
              : config.dev.urlLoaderPublicPath // http://www.baidu.com/
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          context: path.resolve(__dirname, '../src'),
          name: utils.assetsPath('fonts/[path][name]-[hash:8].[ext]'),
          publicPath:
            process.env.NODE_ENV === 'production'
              ? config.build.urlLoaderPublicPath
              : config.dev.urlLoaderPublicPath // http://www.baidu.com/
        }
      },
      {
        test: /\.(csv|tsv)$/,
        use: ['csv-loader']
      },
      {
        test: /\.xml$/,
        use: ['xml-loader']
      }
    ]
  },
  plugins: [
    // 忽略解析三方包里插件（非中文语言包排除掉）
    // new webpack.IgnorePlugin(/\.\/locale/, /moment/)
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),
    // 查阅文档发现 v15 版的 vue-loader 配置需要加个 VueLoaderPlugin
    // 并且不设置 VueLoaderPlugin 的话打包会报错提示需要设置 VueLoaderPlugin 对象
    // https://vue-loader.vuejs.org/zh/guide/#%E6%89%8B%E5%8A%A8%E8%AE%BE%E7%BD%AE
    new VueLoaderPlugin(),
    // 全局提供帮助类库和工具函数（暴露全局变量）
    new webpack.ProvidePlugin(fastConfig.providePlugin)
    // 设置缓存提高打包构建速度
    // new HardSourceWebpackPlugin()
  ]
}
