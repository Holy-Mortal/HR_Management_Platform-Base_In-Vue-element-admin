import axios from 'axios'
import { Message } from 'element-ui'

// create an axios instance 创建 axios 实例对象
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000 // 设置超时时间
})

// request interceptor 请求拦截器
service.interceptors.request.use()

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
  Message.error(error.message) // 提示错误信息
  return Promise.reject(error) // 返回执行错误 让当前的执行链跳出成功环节 直接进入 catch
})

// 导出 axios 实例对象
export default service
