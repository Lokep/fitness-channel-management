import request from '@/utils/request'
import * as qs from 'qs'

export const getPlanList = data => request({
  url: '/Admin/Diet/planList',
  data,
  method: 'post'
})

/**
 * 删除运动计划 @id{string}
 */
export const deletePlan = data => request({
  url: '/Admin/Repository/del',
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
  url: '/Admin/DICT/food-page?' + qs.stringify(data),
  data,
  method: 'post'
})

/** * 食品库 end */
