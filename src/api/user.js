import request from '@/utils/request'

/**
 * 登录接口封装
*/
export function login(data) {
  return request({
    method: 'POST',
    url: '/sys/login',
    data
  })
}

/**
 * 获取用户资料接口
*/
export function getUserInfo() {
  return request({
    method: 'POST',
    url: '/sys/profile'
  })
}
/**
 * 根据用户 id 获取用户的详情 获取员工基本信息
*/
export function getUserDetailById(id) {
  return request({
    method: 'GET',
    url: `/sys/user/${id}`
  })
}
export function logout() {
  return request({
  })
}
