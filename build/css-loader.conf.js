'use strict'
// 根据不同的环境生成不同的配置
module.exports = (isDev, importLoadersNum) => {
  return {
    importLoaders: importLoadersNum,
    localsConvention: 'camelCase',
    // 模块化，指的是这个 css 只在这个模块里有效 （import style from './a.scss'; 取某个class属性 style.avatar）
    // import 导入的 css 模块不适用 cssModule 功能
    modules: {
      localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[name]-[hash:base64:5]'
    }
  }
}
