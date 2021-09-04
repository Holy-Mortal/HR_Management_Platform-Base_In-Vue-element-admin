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

/**
 * 获取员工综合列表数据
**/
export function getEmployeeList(params) {
  return request({
    method: 'GET',
    url: '/sys/user',
    params
  })
}

/**
 * 删除员工接口
**/
export function delEmployee(id) {
  return request({
    method: 'DELETE',
    url: `/sys/user/${id}`
  })
}

/**
 * 新增员工接口
**/
export function addEmployee(data) {
  return request({
    method: 'POST',
    url: '/sys/user',
    data
  })
}

/**
 * 导入员工数据接口  参数 data 是数组
**/
export function importEmployee(data) {
  return request({
    method: 'POST',
    url: '/sys/user/batch',
    data
  })
}

/**
 * 保存用户基本信息
**/
export function saveUserDetailById(data) {
  return request({
    method: 'PUT',
    url: `/sys/user/${data.id}`,
    data
  })
}

/**
 * 读取用户详情的基础信息
**/
export function getPersonalDetail(id) {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}

/**
 * 更新用户详情的基础信息
**/
export function updatePersonal(data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'put',
    data
  })
}

/**
 * 获取用户的岗位信息
**/
export function getJobDetail(id) {
  return request({
    url: `/employees/${id}/jobs`
  })
}

/**
 * 保存岗位信息
**/
export function updateJob(data) {
  return request({
    url: `/employees/${data.userId}/jobs`,
    method: 'put',
    data
  })
}
