
import request from '@/utils/request'

/* 健身运动列表 */
export const getSportsPlanList = data => request({
  url: '/Admin/Motion/planList',
  data,
  method: 'post'
})

export const addPlan = data => request({
  url: '/Admin/Motion/planAdd',
  data,
  method: 'post'
})
