import { initializeApp } from '@firebase/app'
import { getAuth } from '@firebase/auth'
import {
  createRouter,
  createWebHistory,
  Router,
  RouteRecordRaw,
} from 'vue-router'
import useFirebase from '../composables/useFirebase'
import { fetchData } from '../composables/useNetwork'
import { useStore } from '../store/store'
const { get } = fetchData()

const routes: RouteRecordRaw[] = [
  //global routes
  {
    path: '/',
    component: () =>
      import(/* webpackChunkName: "home"*/ '../screens/Landingpage.vue'),
    props: true,
    name: 'home',
  },
  {
    path: '/register',
    component: () =>
      import(/* webpackChunkName: "register"*/ '../screens/Register.vue'),
  },
  {
    path: '/login',
    component: () =>
      import(/* webpackChunkName: "login"*/ '../screens/Login.vue'),
  },
  {
    path: '/menu',
    component: () =>
      import(/* webpackChunkName: "menu"*/ '../screens/Menu.vue'),
  },
  {
    path: '/order',
    component: () =>
      import(/* webpackChunkName: "order"*/ '../screens/Order.vue'),
    props: true,
    beforeEnter: async (to, from, next) => {
      const delivery = localStorage.getItem('delivery')

      if (delivery == null) next({ name: 'home' })
      if (delivery == 'true') {
        to.params.delivery = 'true'
        next()
      } else {
        to.params.delivery = 'false'
        next()
      }
    },
  },
  {
    path: '/tracker/',
    component: () =>
      import(/* webpackChunkName: "tracker"*/ '../screens/Tracker.vue'),
    name: 'tracker',
    props: true,
    beforeEnter: (to, from, next) => {
      if (to.query.id === undefined && to.params.order === undefined)
        next({ name: 'home' })
      else next()
    },
  },
  {
    path: '/test',
    component: () =>
      import(/* webpackChunkName: "tracker"*/ '../screens/Test.vue'),
    props: true,
  },

  {
    path: '/detail',
    component: () =>
      import(/* webpackChunkName: "detail"*/ '../screens/MenuItem.vue'),
    props: true,
    name: 'detail',
    beforeEnter: async (to, from, next) => {
      to.params.pizza ? next() : next('menu')
    },
  },
  //admin routes
  {
    path: '/orders',
    component: () =>
      import(/* webpackChunkName: "orders"*/ '../screens/Orders.vue'),
    beforeEnter: async (to, from, next) => {
      const auth = getAuth()
      const idToken = await auth.currentUser?.getIdToken()

      const { admin } = await get('/user/admin', idToken)

      admin ? next() : next({ name: 'home' })
    },
  },
  {
    path: '/stock',
    component: () =>
      import(/* webpackChunkName: "stock"*/ '../screens/Stock.vue'),
    beforeEnter: async (to, from, next) => {
      const auth = getAuth()
      const idToken = await auth.currentUser?.getIdToken()

      const { admin } = await get('/user/admin', idToken)

      admin ? next() : next({ name: 'home' })
    },
  },
]

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
})

export default router
