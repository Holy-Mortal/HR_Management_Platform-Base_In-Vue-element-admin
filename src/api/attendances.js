import request from '@/utils/request'
// 获取考勤列表
export function getAttendancesList(params) {
  return request({
    method: 'GET',
    url: '/attendances',
    params
  })
}
// 获取考勤详情
export function getAtteArchiveDetail(data) {
  return request({
    method: 'GET',
    url: `/attendances/archive/${data.userId}/${data.yearMonth}`
  })
}
export function updateAttendance(data) {
  return request({
    method: 'PUT',
    url: `/attendances/${data.userId}`,
    data
  })
}
export function getArchivingList(params) {
  return request({
    method: 'GET',
    url: '/attendances/reports/year',
    params
  })
}
export function getArchivingCont(params) {
  return request({
    method: 'GET',
    url: `/attendances/reports/${params.atteArchiveMonthlyId}`,
    params
  })
}

export function importArchive(data) {
  return request({
    method: 'POST',
    url: '/archive/atte/export',
    data
  })
}
// 提醒接口
export function notify() {
  return request({
    method: 'POST',
    url: '/notify/mail'
  })
}
export function archives(params) {
  return request({
    method: 'GET',
    url: '/attendances/archives',
    params
  })
}
export function newReports(params) {
  return request({
    method: 'GET',
    url: '/attendances/newReports',
    params
  })
}

export function reportFormList(params) {
  return request({
    method: 'GET',
    url: '/attendances/reports',
    params
  })
}

// 请假保存
export function leaveSave(data) {
  return request({
    method: 'PUT',
    url: '/cfg/leave',
    data
  })
}
// 请假获取
export function getLeave(data) {
  return request({
    method: 'POST',
    url: '/cfg/leave/list',
    data
  })
}
// 扣款设置保存
export function deductionsSave(data) {
  return request({
    method: 'PUT',
    url: '/cfg/deduction',
    data
  })
}
// 获取扣款设置
export function getDeductions(data) {
  return request({
    method: 'POST',
    url: '/cfg/ded/list',
    data
  })
}

// 加班配置保存
export function overtimeSave(data) {
  return request({
    method: 'PUT',
    url: '/cfg/extDuty',
    data
  })
}

// 获取加班配置
export function getOvertime(data) {
  return request({
    method: 'POST',
    url: '/cfg/extDuty/item',
    data
  })
}
// 考勤数据保存
export function attendanceSave(data) {
  return request({
    method: 'PUT',
    url: '/cfg/atte',
    data
  })
}
// 考勤数据保存
export function getAttendance(data) {
  return request({
    method: 'POST',
    url: '/cfg/atte/item',
    data
  })
}
export function fileUpdate(data) {
  return request({
    method: 'PUT',
    url: `/employees/archives/${data.month}`,
    data
  })
}
