import request from '@/utils/request'
import * as qs from 'qs'

export const getSleepRecords = data => request({
  url: '/Admin/Sleep/list?' + qs.stringify(data),
  data,
  method: 'post'
})

export const updateSleepRecord = data => request({
  url: '/Admin/Sleep/update?' + qs.stringify(data),
  data,
  method: 'post'
})

export const getSleepInfo = data => request({
  url: '/Admin/Sleep/get?' + qs.stringify(data),
  data,
  method: 'post'
})
