import request from '@/utils/request'

export function getApprovalList(data) {
  return request({
    method: 'PUT',
    url: `/user/process/instance/${data.page}/${data.pageSize}`,
    data
  })
}
// 获取审批信息
export function getInformation(id) {
  return request({
    method: 'GET',
    url: `/user/process/instance/getById/${id}`
  })
}
export function getReviewHistory(id) {
  return request({
    method: 'GET',
    url: `/approvals/flows/${id}`
  })
}
export function process(data) {
  return request({
    method: 'POST',
    url: '/approvals/process',
    data
  })
}
export function getSetState(params) {
  return request({
    method: 'GET',
    url: '/approvals/setting',
    params
  })
}
// 保存状态
export function saveSetState(data) {
  return request({
    method: 'PUT',
    url: '/approvals/setting',
    data
  })
}
// 获取流程详情
export function getApprovalsDetail(id) {
  return request({
    method: 'GET',
    url: `/user/process/instance/${id}`
  })
}
// 获取流程详情
export function getApprovalsTaskDetail(id) {
  return request({
    method: 'GET',
    url: `/user/process/instance/tasks/${id}`
  })
}
// 下载图片
export function downImg(picture_id) {
  return request({
    method: 'GET',
    url: `//user/process/buss/showBussImgById/${picture_id}`
  })
}
// 获取流程列表
export function getFlowList(params) {
  return request({
    method: 'GET',
    url: `/user/process/definition`,
    params
  })
}
export function suspend(params) {
  return request({
    method: 'GET',
    url: `/user/process/suspend/${params.processKey}`,
    params
  })
}
export function startProcess(data) {
  return request({
    method: 'POST',
    url: `/user/process/startProcess`,
    data
  })
}
export function applyeLave(data) {
  return request({
    method: 'POST',
    url: `/user/process_leave/startProcess`,
    data
  })
}

// 驳回
export function approvalsReject(data) {
  return request({
    method: 'PUT',
    url: `/user/approvals/${data.id}/reject`,
    data
  })
}
// 删除
export function approvalsDel(id) {
  return request({
    method: 'DELETE',
    url: `/user/approvals/${id}`
  })
}
// 同意
export function approvalsPass(data) {
  return request({
    method: 'PUT',
    url: '/user/process/instance/commit',
    data
  })
}
export function applyDimission(data) {
  return request({
    method: 'POST',
    url: '/user/process_dimission/startProcess',
    data
  })
}
export function applyOvertime(data) {
  return request({
    method: 'POST',
    url: '/user/process_overtime/startProcess',
    data
  })
}
export function exportApprovals(data) {
  return request({
    method: 'GET',
    url: `/approvals/export/${data.month}`,
    data
  })
}

export function updateUser(data) {
  return request({
    method: 'PUT',
    url: `/sys/user/${data.id}`,
    data
  })
}
