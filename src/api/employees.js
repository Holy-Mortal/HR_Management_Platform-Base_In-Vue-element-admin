import request from '@/utils/request'

/**
 * 获取员工简单列表数据
**/
export function getEmployeeSimple() {
  return request({
    method: 'GET',
    url: '/sys/user/simple'
  })
}
