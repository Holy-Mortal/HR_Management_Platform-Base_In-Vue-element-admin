import request from '@/utils/request'

/**
 * 获取组织架构的数据
**/
export function getRoleList(params) {
  return request({
    method: 'GET',
    url: '/sys/role',
    params
  })
}

/**
 * 根据 id 获取企业信息数据
**/
export function getCompanyInfo(companyId) {
  return request({
    method: 'GET',
    url: `/company/${companyId}`
  })
}

/**
 * 根据 id 删除角色数据
**/
export function deleteRole(id) {
  return request({
    method: 'DELETE',
    url: `/sys/role/${id}`
  })
}

/**
 * 读取角色详情数据
**/
export function getRoleDetail(id) {
  return request({
    method: 'GET',
    url: `/sys/role/${id}`
  })
}

/**
 * 根据 id 修改角色数据
**/
export function updateRole(data) {
  return request({
    method: 'PUT',
    url: `/sys/role/${data.id}`,
    data
  })
}

/**
 * 新增角色数据
**/
export function addRole(data) {
  return request({
    method: 'POST',
    url: '/sys/role',
    data
  })
}
