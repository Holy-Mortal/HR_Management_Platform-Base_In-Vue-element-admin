import request from '@/utils/request'
export function imgDownload(data) {
  return request({
    method: 'GET',
    url: `/system/upfile/${data.id}`
  })
}
export function imgUpload(data) {
  return request({
    method: 'POST',
    url: '/system/upfile',
    data
  })
}

export function getCityJSON() {
  return request({
    method: 'GET',
    url: '../../static/json/map.json'
  })
}
export function getCityList() {
  return request({
    method: 'GET',
    url: '/sys/city'
  })
}

