// 需要放在 index.html 的头部
(function (doc, win) {
  // 创建一个元素，检测是否支持1vw
  var dummy = doc.createElement('_').style
  dummy.width = '1vw'
  if (dummy.width) {
    // 设置root fontsize 为1vw
    doc.documentElement.style.fontSize = '1vw'
    // 支持就不在做处理
    return
  }
  // 如果不支持，那么就用 JavaScript 来计算 font-size
  var docEl = doc.documentElement
  var resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize'
  var recalc = function () {
    var clientWidth = docEl.clientWidth
    if (!clientWidth) {
      return
    }
    docEl.style.fontSize = clientWidth / 100 + 'px'
  }
  // 初始化 font-size
  recalc()
  // 添加事件绑定
  win.addEventListener(resizeEvt, recalc, false)
})(document, window)
