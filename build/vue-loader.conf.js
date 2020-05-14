'use strict'
// 根据不同的环境生成不同的配置
module.exports = (isDev) => {
  return {
    // https://vue-loader.vuejs.org/zh/options.html#compiler
    compilerOptions: {
      // 去除空格
      preserveWhitespace: false
    }
  }
}
