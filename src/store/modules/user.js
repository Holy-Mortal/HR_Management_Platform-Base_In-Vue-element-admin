import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'
import { resetRouter } from '@/router'
// 状态
const state = {
  token: getToken(), // 设置 token 为共享状态  初始化 vuex 时先从缓存中读取
  userInfo: {} // 定义空对象
}
// 修改状态
const mutations = {
  setToken(state, token) {
    state.token = token // 将数据设置给 vuex
    setToken(token) // 同步给缓存
  },
  removeToken(state) {
    state.token = null // 将 vuex 的数据清空
    removeToken() // 同步给缓存
  },
  // 设置用户信息
  setUserInfo(state, result) {
    state.userInfo = result // 另一种响应式  state.userInfo = { ...result }
  },
  // 删除用户信息
  removeUserInfo(state) {
    state.userInfo = {}
  }
}
// 执行异步
const actions = {
  async login(context, data) {
    // 调用 api 接口
    const result = await login(data) // 拿到 token
    context.commit('setToken', result) // 设置 token
    // 拿到 token 说明登录成功
    setTimeStamp() // 设置当前时间戳
  },
  async getUserInfo(context) {
    const result = await getUserInfo()
    // 获取用户详情数据
    const baseInfo = await getUserDetailById(result.userId) // 获取用户头像
    // const obj = { ...result, ...baseInfo } // 将两个接口结果合并
    // context.commit('setUserInfo', obj) // 提交到 mutations
    context.commit('setUserInfo', { ...result, ...baseInfo }) // 提交到 mutations
    return result // 用 return 给后期做权限留下伏笔
  },
  // 登出操作
  logout(context) {
    // 删除 token
    context.commit('removeToken') // 不仅删除 vuex 中的 token 还有缓存中的
    // 删除用户资料
    context.commit('removeUserInfo') // 删除用户信息
    // 重置路由
    resetRouter() // 重置路由
    // 设置权限模块下路由为初始状态
    // Vuex 子模块调用子模块的 actions：都没加锁 可直接调用
    // 加了命名空间锁后，如何调用
    // 参数1：mutations名称  参数2：payload载荷  参数3：{ root: true} 调用根级的 mutations 或者 actions
    context.commit('permission/setRoutes', [], { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
