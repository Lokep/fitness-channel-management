import request from '@/utils/request'

export const getPlanList = data => request({
  url: '/Admin/Diet/planList',
  data,
  method: 'post'
})

/** 食物库 */
export const getDishCategoryList = data => request({
  url: '/Admin/DICT/category-list',
  data,
  method: 'post'
})

/** * 食品库 start */

export const getFoodList = data => request({
  url: '/Admin/DICT/food-page',
  data,
  method: 'post'
})

/** * 食品库 end */
