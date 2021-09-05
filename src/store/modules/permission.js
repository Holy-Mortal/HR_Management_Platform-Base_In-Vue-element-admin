/**
 * 处理权限路由模块
 **/
import { constantRoutes, asyncRoutes } from '@/router'
const state = {
  // 一开始 肯定拥有静态路由的权限
  routes: constantRoutes // 路由表    表示用户所拥有的所有路由的数组
}
const mutations = {
  // 定义修改 routes 的 mutations
  // payload 认为是登录成功 需要添加的新路由
  setRoutes(state, newRoutes) {
    // state.routes = [...state.routes, ...newRoutes] // 退出登录 应该取消权限
    state.routes = [...constantRoutes, ...newRoutes] // 每次都是在静态路由的基础上去加新的路由
  }
}
const actions = {
  // 筛选权限路由
  // 第二个参数为当前用户的所拥有的菜单权限
  // menus: ["setting", "permission"]
  // asyncRoutes 是所有的动态路由 [{path: '', name: ''}, {}]
  filterRoutes(context, menus) {
    const routes = []
    // 筛选出 动态路由中和 menus 中能够对上的路由
    menus.forEach(key => {
      // key 表示 标识
      // asyncRoutes 找 有没有对象中的 name 属性等于 key 的  如果找不到就没权限
      routes.push(...asyncRoutes.filter(item => item.name === key)) // 得到一个数组 可能有也可能空
    })
    // 得到的 routes 是所有模块中满足权限要求的路由数组
    // routes 就是当前用户所拥有的的 动态路由的权限
    context.commit('setRoutes', routes) // 将动态路由提交给 mutations
    return routes // state 数据是用来显示 左侧菜单用的 return 是给路由 addRoutes 用的
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
