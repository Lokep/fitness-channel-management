
import request from '@/utils/request'

export const addPlan = data => request({
  url: '/Admin/Motion/planAdd',
  data,
  method: 'post'
})
