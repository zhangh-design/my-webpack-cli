'use strict'
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const LodashWebpackPlugin = require('lodash-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const fastConfig = require('../fast.config.js')
const packageConfig = require('../package.json')
const utils = require('../build/utils.js')
const config = require('../config/index.js')
const merge = require('webpack-merge')
const webpack = require('webpack')
const env = require('../config/prod.env.js')
const baseWebpackConfig = require('./webpack.base.js')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HTMLInlineCSSWebpackPlugin = require('html-inline-css-webpack-plugin').default
const TerserPlugin = require('terser-webpack-plugin')

const otherDependencies = utils.arrayRemoveItems(Object.keys(packageConfig.dependencies), fastConfig.removeOtherDependenciesCacheGroupsLibs || [])
const webpackConfig = merge(baseWebpackConfig, {
  // 不设置 mode 默认 production
  mode: process.env.NODE_ENV || 'production',
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    filename: utils.assetsPath('js/[name].[chunkhash].js'), // 入口文件打包生成js文件走 filename 配置项
    chunkFilename: utils.assetsPath('js/vendor/[name].[chunkhash].js'), // splitChunks 分割出模块，动态import 引入的模块
    path: config.build.assetsRoot
  },
  optimization: {
    // 兼容旧版 webpack 在源代码不变的情况下打包构建后对应 chunk 文件的 contenthash 值也会发生变化
    // 从 chunk 文件中抽离出 webpack 源代码或者说呢运行时它要用到的代码放到了名字叫做 `runtime` 的一个 chunk 里面，可以在通过 html-webpack-inline-source-plugin 内联 Runtime 代码到 HTML 页面中
    // 注意：在 Webpack 4.29.6 版本已经修改了模板输出的 Template，即使 entry 修改，实际 Runtime 部分的内容也不会有变化，所以上面分离 Runtime 的方案适应于低版本的 Webpack。
    // runtimeChunk: {
    //     name: 'runtime'
    // },
    // 压缩
    minimize: true,
    // 压缩 js和css
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: fastConfig.isProdConsoleLog || false // console 日志输出
          }
        },
        cache: true, // 开启缓存
        parallel: true, // 多线程
        sourceMap: true // 启动 source-map ，默认false 不启动
      }),
      new OptimizeCSSAssetsPlugin({}) // 压缩后 css 文件的 source-map 文件不会生成
    ],
    usedExports: true, // production 模式默认开启 Tree Shaking 摇树优化（可以通过在 package.json 中设置 sideEffects 属性来调整摇树优化过滤规则）
    splitChunks: {
      chunks: 'all', // initial（有共用的情况即发生拆分）async（异步 动态引入的模块不受影响，它是无论如何都会被拆分出去的）all（同步和异步），推荐 all
      minSize: 30000, // 模块最小尺寸，30K，越大那么单个文件越大，chunk 数就会变少（针对于提取公共 chunk 的时候，不管再大也不会把动态加载的模块合并到初始化模块中）当这个值很大的时候就不会做公共部分的抽取了
      maxSize: 0, // 模块最大尺寸，0为不限制
      minChunks: 1, // 默认1，被提取的一个模块至少需要在几个 chunk 中被引用，这个值越大，抽取出来的文件就越小
      maxAsyncRequests: 5, // 在做一次按需加载的时候最多有多少个异步请求，为 1 的时候就不会抽取公共 chunk 了（一般不用改）
      maxInitialRequests: 7, // 针对一个 entry 做初始化模块分隔的时候的最大文件数，优先级高于 cacheGroup，所以为 1 的时候就不会抽取 initial common 了（如果 cacheGroups 设置的缓存组个数超过了 maxInitialRequests 这个参数的值那么将无法分割出超过的文件，而会把需要分割的缓存组文件放到其它的组里去）
      automaticNameDelimiter: '~', // 打包文件名分隔符
      name: true, // 拆分出来文件的名字，默认为 true，表示自动生成文件名，如果设置为固定的字符串那么所有的 chunk 都会被合并成一个
      // 同步导入进入的分割规则，异步动态import使用 魔法注释
      // 这里的缓存组已经超过 3 ，请修改 maxInitialRequests 否则最多只能分割出 3 个文件
      cacheGroups: {
        /* vendors: {
          test: /[\\/]node_modules[\\/]/, // 正则规则，如果符合就提取 chunk
          priority: -10 // 缓存组优先级，当一个模块可能属于多个 chunkGroup，这里是优先级
        }, */
        vendors: false,
        vueBase: {
          name: 'vueBase',
          // test: /_vue@2.6.11@vue|_vuex@3.3.0@vuex|_vue-router@3.1.6@vue-router/ig, // /vue/ig 这样写会匹配到 vuex vue-router 这些其它包含 vue 字符的库
          test: /[\\/]node_modules[\\/](_vue@2.6.11@vue)[\\/]|[\\/]node_modules[\\/](_vuex@3.3.0@vuex)[\\/]|[\\/]node_modules[\\/](_vue-router@3.1.6@vue-router)[\\/]/ig,
          enforce: true
          // filename: utils.assetsPath('js/vendor/vueBase.[chunkhash].js')
        },
        fastElemntUi: {
          name: 'fastElementUi',
          test: /fast-element-ui/ig, // _fast-element-ui@0.1.32@fast-element-ui
          priority: 10,
          enforce: true
        },
        axiosApiQuery: {
          name: 'axiosApiQuery',
          test: /axios-api-query/ig,
          enforce: true
        },
        otherDependencies: {
          name: 'otherDependencies',
          // test: /vdjs|querystring|nprogress|moment|lodash-es|element-ui|vuex-persistedstate/ig,
          // eslint-disable-next-line no-eval
          test: eval('/' + otherDependencies.join('|') + '/g'),
          enforce: true
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true // 忽略默认的参数（比如：minSize）只要是 .css 文件就做代码的拆分
        },
        default: {
          // 这里需要你理解 chunk 是什么，这里的 2 并不是你 import 的次数超过 2（import 的是 module）
          // chunk 包含着 module，可能是一对多也可能是一对一，一般一个 chunk对应一个bundle
          // 所以如果我们是单页面（一个chunk一个bundke），那么其实 default 如果设置的是 2 这个缓存组也就不会进行代码的分割
          minChunks: 2, // 设置成 2 如果是单页面（一个chunk一个bundke）模式那么其实是不会进到 default 这个组的
          // minChunks: 1,
          // minSize: 0, // 这两个配置可以在单页面（一个chunk一个bundke）中将 import 引入的 src 目录下的 module 不论大小都分割到 default 这个组里，一般不建议这么做
          priority: -20,
          reuseExistingChunk: true // 是否使用已有的 chunk，如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的。
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            // webpack 4 的版本 生产环境 不在需要使用 'vue-style-loader'
            // [webpack 3 版本的配置请看下面链接](https://vue-loader.vuejs.org/zh/guide/extract-css.html#webpack-4)
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false
            }
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.(sa|sc)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false
            }
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'postcss-loader', // 新版 postcss-loader 要放在 sass-loader 之前
          'sass-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false
            }
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    // 导入自定义环境变量
    new webpack.DefinePlugin({
      'process.env': env,
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }),
    // 优化 lodash 减小构建包体积
    new LodashWebpackPlugin(),
    // 清除构建包
    new CleanWebpackPlugin({
      verbose: true, // 在命令窗口中打印`clean-webpack-plugin`日志
      cleanOnceBeforeBuildPatterns: [
        path.resolve(__dirname, '../dist'),
        path.resolve(__dirname, '../sprites')
      ] // 清除的文件/文件夹
    }),
    // 从 bundle 中提取文本（CSS）到单独的文件
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('/css/[name].[contenthash:8].css'),
      chunkFilename: utils.assetsPath(
        '/css/vendors/[name].[contenthash:8].chunk.css'
      )
    }),
    // 以 template 摸板生成指定的html文件
    new HtmlWebpackPlugin({
      title: config.build.title,
      filename: config.build.index,
      template: config.build.template,
      favicon: config.build.favicon,
      // 添加指定的chunk，多页应用时需要动态指定，单页不用配置（不配置就会引入所有页面的资源）
      // 在配置多个页面时，每个页面注入的thunk应该是不相同的，需要通过该配置为不同页面注入不同的thunk
      // 比如：登录页面`chunks: ['login']`，主页面`chunks: ['main']`
      // chunks: ['app'],
      inject: true, // 默认 true，将脚本注入到body元素的底部
      // 美化 html 文件，去除空格、注释等（ production 时使用）
      minify: {
        removeComments: true, // 去除HTML注释
        collapseWhitespace: true, // 去掉空格
        removeAttributeQuotes: true
      },
      // 4.2.0 版本已经移除 'dependency'
      // 允许指定的thunk在插入到html文档前进行排序，旧版本（例如^3.2.0）会配置为 'dependency'
      // 多页面中一般会提取公共部分的chunk，这个时候一个html页面会引入多个chunk，而这些chunk之间是有依赖关系的，即必须按照顺序用script标签引入，chunksSortMode是用来指定这种顺序的排序规则，dependency是指按照依赖关系排序。
      // 旧版配置为 'dependency' 可能会出现 `Cyclic dependency   错误：循环依赖` 的问题，可以升级插件到最新
      // `Cyclic dependency`网上的解决办法设置为`none`但这样页面加载顺序就不能保证了，可能会出现样式被覆盖的现象
      chunksSortMode: 'auto',
      hash: fastConfig.isAppHash, // 清除缓存
      isUsedPr2Rem: fastConfig.isUsedPr2Rem // 是否使用相对单位pr->rem
    }),
    // 拷贝静态资源到当前的工作目录（output.path）
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*'] // 忽略拷贝指定的文件 （忽略所有 jpg 文件：*.jpg）
      }
    ])
  ]
})
// 查看 webpack 打包情况
if (fastConfig.isBundleAnalyzer) {
  webpackConfig.plugins.push(
    new BundleAnalyzerPlugin()
  )
}
// ie 环境下 动态import 分割的 babel 模块统一到名叫 core-js-base 文件
if (fastConfig.ieDynamicImport) {
  webpackConfig.optimization.splitChunks.cacheGroups['core-js-base'] = {
    name: 'core-js-base',
    test: /[\\/]node_modules[\\/]_core-js@2.6.11@core-js|_core-js@3.6.5@core-js[\\/]/,
    priority: -10,
    filename: utils.assetsPath('js/vendor/core-js-base.[chunkhash].js')
  }
}
// 组装 html-webpack-externals-plugin
if (fastConfig.cdnJsArray.length > 0) {
  const cdnModulelist = []
  const externals = {}
  for (const elem of fastConfig.cdnJsArray.values()) {
    cdnModulelist.push(elem)
    if (Reflect.has(elem, 'alias')) {
      externals[elem.alias] = elem.global
      Reflect.deleteProperty(elem, 'alias')
    }
  }
  if (cdnModulelist.length > 0) {
    webpackConfig.plugins.splice(webpackConfig.plugins.length - 1, 0, new HtmlWebpackExternalsPlugin({
      externals: cdnModulelist
    }))
    // 抽离库不打包到构建文件中减小构建包体积，但要通过 script 标签在外部引入，建议需要和 fast.config.js 中的 cdnJsArray 一起使用
    webpackConfig.externals = externals
  }
}
// css 是否要内联到 <style></style> 标签内
if (fastConfig.isProdCssInline) {
  webpackConfig.plugins.push(new HTMLInlineCSSWebpackPlugin())
}

module.exports = webpackConfig
