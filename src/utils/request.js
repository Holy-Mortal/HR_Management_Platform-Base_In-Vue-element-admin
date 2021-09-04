import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'
import { getTimeStamp } from '@/utils/auth'

const TimeOut = 3600 // 定义超时时间 单位 秒(s) 时间戳 单位 毫秒(ms)

// create an axios instance 创建 axios 实例对象
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000 // 设置超时时间
})

// request interceptor 请求拦截器
service.interceptors.request.use(config => {
  // config 是请求的配置信息
  // 注入 token
  if (store.getters.token) {
    // 只有存在 token 时，才有必要检查时间戳是否超时
    if (IsCheckTimeOut()) {
      // 如果为 true 表示 过期了
      store.dispatch('user/logout') // token 超时，登出操作 删除 token
      // 跳转到登录页
      router.push('/login')
      return Promise.reject(new Error('登录超时，请您重新登录！'))
    }
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config // 必须要返回
}, error => {
  return Promise.reject(error) // 返回执行错误 让当前的执行链跳出成功环节 直接进入 catch
})

// response interceptor 响应拦截器
service.interceptors.response.use(response => {
  const { success, message, data } = response.data
  // 根据 success 的成功与否决定之后的操作
  if (success) {
    return data
  } else {
    Message.error(message) // 提示错误信息
    return Promise.reject(new Error(message))
  }
}, error => {
  // error 信息里面 response 对象
  if (error.response && error.response.data && error.response.data.code === 10002) {
    // 当 error.response.data.code === 10002 表示 后端提醒 token 超时
    store.dispatch('user/logout') // token 超时，登出操作 删除 token
    // 跳转到登录页
    router.push('/login')
  } else {
    Message.error(error.message) // 提示错误信息
  }
  return Promise.reject(error) // 返回执行错误 让当前的执行链跳出成功环节 直接进入 catch
})

// 是否超时
// 超时逻辑：(当前时间 - 缓存中时间) 是否 大于 时间差
function IsCheckTimeOut() {
  var currentTime = Date.now() // 当前时间戳
  var timeStamp = getTimeStamp() // 缓存时间戳
  var mathTime = (currentTime - timeStamp) / 1000
  return mathTime > TimeOut
}

// 导出 axios 实例对象
export default service
