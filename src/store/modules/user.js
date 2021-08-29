import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'
// 状态
const state = {
  token: getToken() // 设置 token 为共享状态  初始化 vuex 时先从缓存中读取
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
  }
}
// 执行异步
const actions = {
  async login(context, data) {
    // 调用 api 接口
    const result = await login(data) // 拿到 token
    context.commit('setToken', result) // 设置 token
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
