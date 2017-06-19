import VueRouter from 'vue-router'
import Emitter from 'helpers/Emitter'

import Home from 'containers/Home'
import Details from 'containers/Details'
import FirstRegister from 'containers/FirstRegister'
import Submission from 'containers/Submission'
import ArtSpiegelman from 'containers/ArtSpiegelman'
import Informations from 'containers/Informations'


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
      {
        path: '/art-spiegelman',
        name: 'art-spiegelman',
        component: ArtSpiegelman,
        meta: {
          keepAlive: false
        }
      },
      // {
      //   path: '*',
      //   redirect: '/'
      // },
      {
        path: '/art-spiegelman/details/:id',
        name: 'details',
        component: Details,
        meta: {
          keepAlive: false
        }
      },
      {
        path: '/first-register',
        name: 'firstRegister',
        component: FirstRegister,
        meta: {
          keepAlive: false
        }
      },
      {
        path: '/submission',
        name: 'submission',
        component: Submission,
        meta: {
          keepAlive: false
        }
      },
      {
        path: '/informations',
        name: 'informations',
        component: Informations,
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
