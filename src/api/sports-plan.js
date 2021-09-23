import request from '@/utils/request'

export const getSportsPlanList = data => request({
  url: '/Admin/Repository/list',
  data,
  method: 'post'
})
