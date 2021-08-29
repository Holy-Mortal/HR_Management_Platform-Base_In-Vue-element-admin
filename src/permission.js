// 权限拦截在路由跳转  导航守卫 // 不需要导出，只需要执行代码

import router from '@/router' // 引入路由实例
import store from '@/store' // 引入vuex store实例
import nprogress from 'nprogress' // 引入进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式

/**
 *  前置守卫
*/
const whiteList = ['/login', '/404'] // 定义白名单
// next是前置守卫必须执行的钩子，否则页面死住 next()：放过 next(false)：跳转终止 next(地址)：跳转到摸个地址
router.beforeEach((to, from, next) => {
  nprogress.start() // 开启进度条
  if (store.getters.token) {
    // 如果有 token
    if (to.path === '/login') {
      // 如果要访问的是 登录页
      next('/') // 跳到主页
    } else {
      next() // 放过
    }
  } else {
    // 没有 token 的情况下
    if (whiteList.indexOf(to.path) > -1) {
      // 表示要去的地址在白名单
      next() // 放过
    } else {
      next('/login') // 跳转到登录页
    }
  }
  nprogress.done() // 解决手动切换地址时，进度条不关闭的问题
})
/**
 *  后置守卫
*/
router.afterEach(() => {
  nprogress.done() // 关闭进度条
})
