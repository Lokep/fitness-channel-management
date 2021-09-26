import request from '@/utils/request'
import * as qs from 'qs'

export const getSportsPlanList = data => request({
  url: '/Admin/Repository/list?' + qs.stringify(data),
  data,
  method: 'post'
})

export const getMemberList = data => request({
  url: '/Admin/Member/list',
  data,
  method: 'post'
})

export const deletePlan = ({ id }) => request({
  url: '/Admin/Repository/del?id=' + id,
  method: 'post'
})

export const transmitPlan = data => request({
  url: '/Admin/Repository/planDistribute',
  data,
  method: 'post'
})

export const addSportsPlan = data => request({
  url: '/Admin/Repository/add',
  data,
  method: 'post'
})

export const updateSportsPlan = data => request({
  url: '/Admin/Repository/update',
  data,
  method: 'post'
})
