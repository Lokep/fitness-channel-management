import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import * as qs from 'qs'
import { getCache } from '.'
/* 请求参数长度 */
const queryStringLength = 1000
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// axios.defaults.headers = {
//   "Content-Type": "application/x-www-form-urlencoded"
// }

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      config.headers['X-Token'] = getToken()
    }
    let urlString = config.url + '?' + qs.stringify(config.data)
    if (urlString.length > queryStringLength) {
      urlString = config.url
    }

    const { account = 'Admin', id = '1' } = getCache('loginInfo')

    config.data = {
      memberId: '',

      ...config.data,

      userId: id,
      timespan: new Date().getTime(),

      creatorId: id,
      creatorName: account
    }

    config.headers = {
      ...config.headers
      // sign:
    }

    return {
      method: 'get',

      ...config,

      url: urlString
    }
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(

  response => {
    const res = response.data
    // if (process.env.NODE_ENV === 'development') {
    //   console.log(res)
    // }
    if (res.result !== 1) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
