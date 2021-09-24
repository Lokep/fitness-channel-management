import request from '@/utils/request'

export const getClockList = data => request({
  url: '/Admin/Diet/clockList',
  data,
  method: 'post'
})
