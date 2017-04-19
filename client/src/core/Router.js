import VueRouter from 'vue-router'
import Emitter from 'helpers/Emitter'

import Home from 'containers/Home'
import Details from 'containers/Details'


import {
  ROUTER_BEFORE_EACH,
  ROUTER_AFTER_EACH
} from 'config/messages'

Vue.use(VueRouter)

class Router extends VueRouter {

  constructor () {
    const routes = [
      {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
          keepAlive: false
        }
      },
      // {
      //   path: '*',
      //   redirect: '/'
      // }
      {
        path: '/details',
        name: 'details',
        component: Details,
        meta: {
          keepAlive: false
        }
      }
    ]

    super({
      mode: 'history',
      scrollBehavior: () => ({ y: 0 }),
      routes
    })

    this.lastRoute = null
    this.loaderTimeout = null
  }
}

const router = new Router()

router.beforeEach(function (to, from, next) {
  console.log('Router :: before each')
  Emitter.emit(ROUTER_BEFORE_EACH, {to, from, next})
  next()
})

router.afterEach(function (to, from) {
  console.log('Router :: after each')
  Emitter.emit(ROUTER_AFTER_EACH, {to, from})
  if (from.name) {
    router.lastRoute = from
  }
})

export default new Router()
