// 负责管理所有的自定义指令

export const imagerror = {
  // 指令对象，会在当前的 dom 元素插入到节点之后执行
  inserted(dom, options) {
    // dom 表示当前指令作用的 dom 对象 // options 是指令中的变量的解释 其中一个属性 value
    // 当图片有地址 但地址没有加载成功时 会报错 会触发图片事件 => onerror
    dom.onerror = function() {
      // 当图片出现异常时，会将指令配置的默认图片设置为该图片的内容 options.value
      // dom 可以注册 error 事件
      dom.src = options.value // 这里不能写死
    }
  }
}
// <img v-imagerror="img" />
// data () { return { img: 'a.png' } }
