import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _51b6eb76 = () => interopDefault(import('../pages/policy.vue' /* webpackChunkName: "pages/policy" */))
const _7f12309d = () => interopDefault(import('../pages/radiator.vue' /* webpackChunkName: "pages/radiator" */))
const _2717a8e2 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/policy",
    component: _51b6eb76,
    name: "policy"
  }, {
    path: "/radiator",
    component: _7f12309d,
    name: "radiator"
  }, {
    path: "/",
    component: _2717a8e2,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
