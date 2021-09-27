import request from '@/utils/request'

export const getSleepRecords = data => request({
  url: '/Admin/Sleep/list',
  data,
  method: 'post'
})

export const updateSleepRecord = data => request({
  url: '/Admin/Sleep/update',
  data,
  method: 'post'
})

export const getSleepInfo = data => request({
  url: '/Admin/Sleep/get',
  data,
  method: 'post'
})
