
import request from '@/utils/request'

/* 健身运动列表 */
export const getSportsPlanList = data => request({
  url: '/Admin/Motion/planList',
  data,
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded'
  // },
  method: 'post'
})

export const addPlan = data => request({
  url: '/Admin/Motion/planAdd',
  data,
  method: 'post'
})
/* 健身运动删除 */
export const deleteSportsPlan = data => request({
  url: '/Admin/Motion/planDel',
  data,
  method: 'post'
})
/* 健身运动获取 */
export const getSportsPlanDetail = data => request({
  url: '/Admin/Motion/planGet',
  data,
  method: 'post'
})
/* 健身运动编辑 */
export const updateSportsPlanDetail = data => request({
  url: '/Admin/Motion/planUpdate',
  data,
  method: 'post'
})
/* 获取会员列表，位置不对，后续合并 */
export const getVipList = data => request({
  url: '/Admin/Member/list',
  data,
  method: 'post'
})
/* 运动计划分发 */
export const planDistribute = data => request({
  url: '/Admin/Repository/planDistribute',
  data,
  method: 'post'
})
