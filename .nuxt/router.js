import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _66875e6c = () => interopDefault(import('../pages/about.vue' /* webpackChunkName: "pages/about" */))
const _11c35bf3 = () => interopDefault(import('../pages/cart.vue' /* webpackChunkName: "pages/cart" */))
const _c1724bb4 = () => interopDefault(import('../pages/contacts.vue' /* webpackChunkName: "pages/contacts" */))
const _7ab5dd47 = () => interopDefault(import('../pages/delivery.vue' /* webpackChunkName: "pages/delivery" */))
const _3327c583 = () => interopDefault(import('../pages/payment.vue' /* webpackChunkName: "pages/payment" */))
const _51b6eb76 = () => interopDefault(import('../pages/policy.vue' /* webpackChunkName: "pages/policy" */))
const _7f12309d = () => interopDefault(import('../pages/radiator.vue' /* webpackChunkName: "pages/radiator" */))
const _7046197a = () => interopDefault(import('../pages/return.vue' /* webpackChunkName: "pages/return" */))
const _4dd01fbb = () => interopDefault(import('../pages/search.vue' /* webpackChunkName: "pages/search" */))
const _037bfe4f = () => interopDefault(import('../pages/warranty.vue' /* webpackChunkName: "pages/warranty" */))
const _1b9788d2 = () => interopDefault(import('../pages/product/_id.vue' /* webpackChunkName: "pages/product/_id" */))
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
    path: "/about",
    component: _66875e6c,
    name: "about"
  }, {
    path: "/cart",
    component: _11c35bf3,
    name: "cart"
  }, {
    path: "/contacts",
    component: _c1724bb4,
    name: "contacts"
  }, {
    path: "/delivery",
    component: _7ab5dd47,
    name: "delivery"
  }, {
    path: "/payment",
    component: _3327c583,
    name: "payment"
  }, {
    path: "/policy",
    component: _51b6eb76,
    name: "policy"
  }, {
    path: "/radiator",
    component: _7f12309d,
    name: "radiator"
  }, {
    path: "/return",
    component: _7046197a,
    name: "return"
  }, {
    path: "/search",
    component: _4dd01fbb,
    name: "search"
  }, {
    path: "/warranty",
    component: _037bfe4f,
    name: "warranty"
  }, {
    path: "/product/:id?",
    component: _1b9788d2,
    name: "product-id"
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
