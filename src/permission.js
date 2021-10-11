import router from './router'
// import store from './store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
// import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { getCache } from './utils'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  const { token = '' } = getCache('loginInfo') || {}
  if (!token && to.path !== '/login') next('/login')

  NProgress.start()

  document.title = getPageTitle(to.meta.title)

  next()
})

router.afterEach(() => {
  NProgress.done()
})
