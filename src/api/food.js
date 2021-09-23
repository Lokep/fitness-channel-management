import request from '@/utils/request'

export const getFoodCategorytList = data => request({
  url: '/Admin/DICT/category-list',
  data,
  method: 'post'
})
export const getFoodSelectList = data => request({
  url: '/Admin/DICT/food-list',
  data,
  method: 'post'
})
