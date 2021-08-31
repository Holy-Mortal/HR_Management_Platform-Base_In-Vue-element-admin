import request from '@/utils/request'

/**
 * 获取组织架构的数据
**/
export function getDepartments() {
  return request({
    method: 'GET',
    url: '/company/department'
  })
}

/**
 * 根据 id 删除组织架构的部门数据
**/
export function delDepartments(id) {
  return request({
    method: 'DELETE',
    url: `/company/department/${id}`
  })
}

/**
 * 根据 id 新增组织架构的部门数据
**/
export function addDepartments(data) {
  return request({
    method: 'POST',
    url: '/company/department',
    data // axios 的 body 参数 data
  })
}

/**
 * 根据 id 获取组织架构的部门详情数据
**/
export function getDepartDetail(id) {
  return request({
    method: 'GET',
    url: `/company/department/${id}`
  })
}

/**
 * 保存组织架构中的部门详情数据
**/
export function updateDepartments(data) {
  return request({
    method: 'PUT',
    url: `/company/department/${data.id}`,
    data
  })
}
