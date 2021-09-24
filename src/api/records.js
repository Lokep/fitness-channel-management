import request from '@/utils/request'

export const getClockList = data => request({
  url: '/Admin/Diet/clockList',
  data,
  method: 'post'
})
export const getClockDetail = data => request({
  url: '/Admin/Diet/clockGet',
  data,
  method: 'post'
})
