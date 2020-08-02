import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _66875e6c = () => interopDefault(import('../pages/about.vue' /* webpackChunkName: "pages/about" */))
const _11c35bf3 = () => interopDefault(import('../pages/cart.vue' /* webpackChunkName: "pages/cart" */))
const _bdbcbeae = () => interopDefault(import('../pages/components.vue' /* webpackChunkName: "pages/components" */))
const _c1724bb4 = () => interopDefault(import('../pages/contacts.vue' /* webpackChunkName: "pages/contacts" */))
const _548d8126 = () => interopDefault(import('../pages/cookie_info.vue' /* webpackChunkName: "pages/cookie_info" */))
const _7ab5dd47 = () => interopDefault(import('../pages/delivery.vue' /* webpackChunkName: "pages/delivery" */))
const _3327c583 = () => interopDefault(import('../pages/payment.vue' /* webpackChunkName: "pages/payment" */))
const _6d71a5c2 = () => interopDefault(import('../pages/pipes.vue' /* webpackChunkName: "pages/pipes" */))
const _2ed7b3f6 = () => interopDefault(import('../pages/privacy.vue' /* webpackChunkName: "pages/privacy" */))
const _65beddcc = () => interopDefault(import('../pages/protect.vue' /* webpackChunkName: "pages/protect" */))
const _7f12309d = () => interopDefault(import('../pages/radiator.vue' /* webpackChunkName: "pages/radiator" */))
const _7046197a = () => interopDefault(import('../pages/return.vue' /* webpackChunkName: "pages/return" */))
const _4dd01fbb = () => interopDefault(import('../pages/search.vue' /* webpackChunkName: "pages/search" */))
const _037bfe4f = () => interopDefault(import('../pages/warranty.vue' /* webpackChunkName: "pages/warranty" */))
const _71778794 = () => interopDefault(import('../pages/order/_id.vue' /* webpackChunkName: "pages/order/_id" */))
const _1b9788d2 = () => interopDefault(import('../pages/product/_id.vue' /* webpackChunkName: "pages/product/_id" */))
const _2717a8e2 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _1861f167 = () => interopDefault(import('../pages/*.vue' /* webpackChunkName: "pages/*" */))

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
    path: "/components",
    component: _bdbcbeae,
    name: "components"
  }, {
    path: "/contacts",
    component: _c1724bb4,
    name: "contacts"
  }, {
    path: "/cookie_info",
    component: _548d8126,
    name: "cookie_info"
  }, {
    path: "/delivery",
    component: _7ab5dd47,
    name: "delivery"
  }, {
    path: "/payment",
    component: _3327c583,
    name: "payment"
  }, {
    path: "/pipes",
    component: _6d71a5c2,
    name: "pipes"
  }, {
    path: "/privacy",
    component: _2ed7b3f6,
    name: "privacy"
  }, {
    path: "/protect",
    component: _65beddcc,
    name: "protect"
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
    path: "/order/:id?",
    component: _71778794,
    name: "order-id"
  }, {
    path: "/product/:id?",
    component: _1b9788d2,
    name: "product-id"
  }, {
    path: "/",
    component: _2717a8e2,
    name: "index"
  }, {
    path: "/*",
    component: _1861f167,
    name: "*"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
