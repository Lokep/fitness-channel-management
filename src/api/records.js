import request from '@/utils/request'
import * as qs from 'qs'
/* 饮食打卡列表 */
export const getClockList = data => request({
  url: '/Admin/Diet/clockList',
  data,
  method: 'post'
})
/* 获取打卡详情 饮食打卡获取 */
export const getClockDetail = data => request({
  url: '/Admin/Diet/clockGet?' + qs.stringify(data),
  data,
  method: 'post'
})
/* 更新详情 打卡记录保存 */
export const UpdateClockDetail = data => request({
  url: '/Admin/Diet/clockUpdate',
  data,
  method: 'post'
})
