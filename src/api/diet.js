import request from '@/utils/request'

export const getPlanList = data => request({
  url: '/Admin/Diet/planList',
  data,
  method: 'post'
})

export const deletePlan = params => request({
  url: '/diet/plan/delete',
  data: params,
  method: 'delete'
})

/** 食物库 */
export const getDishCategoryList = data => request({
  url: '/Admin/DICT/category-list',
  data,
  method: 'post'
})
