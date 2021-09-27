import request from '@/utils/request'
import * as qs from 'qs'
/**
 * @categoryType {string} required {1|食物}
 */
export const getFoodCategoryList = (data = {}) => request({
  url: '/Admin/DICT/category-list',
  data,
  method: 'post'
})

export const getFoodSelectList = (data = {}) => request({
  url: '/Admin/DICT/food-list',
  data,
  method: 'post'
})

export const addFood = data => request({
  url: '/Admin/DICT/foodAdd?' + qs.stringify(data),
  data,
  method: 'post'
})

export const editFood = data => request({
  url: '/Admin/DICT/foodUpdate?' + qs.stringify(data),
  data,
  method: 'post'
})
