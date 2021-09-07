import request from '@/utils/request'

export function getSalarysList(data) {
  return request({
    method: 'POST',
    url: '/salarys/list',
    data
  })
}

export function getTips(yearMonth) {
  return request({
    method: 'GET',
    url: `/salarys/tips/${yearMonth}`
  })
}
export function getSettings() {
  return request({
    method: 'GET',
    url: '/salarys/settings'
  })
}

export function getCompanySetting() {
  return request({
    method: 'GET',
    url: '/salarys/company-settings'
  })
}
export function saveSettings(data) {
  return request({
    method: 'POST',
    url: '/salarys/settings',
    data
  })
}

export function getSalaryDetail(userId) {
  return request({
    method: 'GET',
    url: `/salarys/modify/${userId}`
  })
}
export function changeSalary(data) {
  return request({
    method: 'POST',
    url: `/salarys/modify/${data.userId}`,
    data
  })
}
export function initSalary(data) {
  return request({
    method: 'POST',
    url: `/salarys/init/${data.userId}`,
    data
  })
}
export function getArchivingList(params) {
  return request({
    method: 'GET',
    url: `/salarys/reports/${params.year}`,
    params
  })
}
export function getArchivingCont(params) {
  return request({
    method: 'GET',
    url: `/salarys/reports/${params.yearMonth}`,
    params
  })
}
export function newReport(data) {
  return request({
    method: 'PUT',
    url: `/salarys/reports/${data.yearMonth}/newReport`,
    data
  })
}
export function getArchivingExport(params) {
  return request({
    method: 'GET',
    url: `/salarys/reports/${params.yearMonth}/export`,
    params
  })
}
export function getArchivingFirst(params) {
  return request({
    method: 'GET',
    url: `/salarys/reports/${params.yearMonth}/first`,
    params
  })
}
export function getArchivingArchive(data) {
  return request({
    method: 'POST',
    url: `/salarys/reports/${data.yearMonth}/archive`,
    data
  })
}
