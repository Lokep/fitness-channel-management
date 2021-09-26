import request from '@/utils/request'

export const getSportsPlanList = data => request({
  url: '/Admin/Repository/list',
  data,
  method: 'post'
})

export const getMemberList = data => request({
  url: '/Admin/Member/list',
  data,
  method: 'post'
})

export const deletePlan = data => request({
  url: '/Admin/Repository/del',
  data,
  method: 'post'
})

export const transmitPlan = data => request({
  url: '/Admin/Repository/planDistribute',
  data,
  method: 'post'
})
