
打包构建：
- npm run dev和npm run serve 开发环境打包（webpack-dev-server）
- npm run dev-build 开发环境打包，有 dist 目录输出
- npm run build 生产环境打包
- npm run lint esint语法检验
- npm run lint-fix eslint语法检验和修复

// npx webpack 执行的 wbepack 是我项目内安装的 webpack 版本，不是全局安装的版本

// 指定某个配置文件
npx webpack --config webpack.config.js

// 从 webpack.config_1.js 这个配置文件中读取配置进行打包
npx webpack --config webpack.config_1.js

我在 package.json 中 移除 `main` 入口 配置，并且设置安装包是 private （私有的），这可以防止意外发布你的代码。

项目结构：

```
build
 |-utils.js
 |-vue-loader.conf.js
 |-webpack.base.js
 |-webpack.dev.js
 |-webpack.prod.js
config
 |-dev.env.js （开发环境环境变量）
 |-index.js
 |-mpa.js
 |-prod.enc.js （生产环境环境变量）
public
 |-favicon.ico
 |-index.html
 |-link.html （外部css链接）
 |-meta.html（meta头信息）
src
 |-assets
   |-css
   |-exclude-img （不使用 image-webpack-loader 处理的图片，url-loader 会处理）
   |-img （一般的图片资源 会使用 url-loader 和 image-webpack-loader）
   |-sprites-img （生成精灵图）
 |-components （项目组件）
 |-config
   |-interceptors（拦截器）
   |-index.js （项目配置）
 |-plugins （插件）
 |-router （vue-router实例）
 |-service （模型文件）
 |-store （vuex实例）
 |-utils （帮助函数）
 |-views （视图page）
```
