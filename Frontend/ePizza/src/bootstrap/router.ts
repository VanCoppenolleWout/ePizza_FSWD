import { initializeApp } from '@firebase/app'
import { getAuth } from '@firebase/auth'
import { computed, toRefs } from 'vue'
import {
  createRouter,
  createWebHistory,
  Router,
  RouteRecordRaw,
} from 'vue-router'
import useFirebase from '../composables/useFirebase'
import { fetchData } from '../composables/useNetwork'
import { store } from '../store/store'
const { get } = fetchData()
const admin = computed(() => {
  return store.getters.getAdmin
})

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
    path: '/forgotpassword',
    component: () =>
      import(/* webpackChunkName: "register"*/ '../screens/ForgotPassword.vue'),
  },
  {
    path: '/login',
    component: () =>
      import(/* webpackChunkName: "login"*/ '../screens/Login.vue'),
    beforeEnter: async (to, from, next) => {
      const { user } = toRefs(useFirebase())

      ;(await user.value?.getIdToken()) ? next({ name: 'home' }) : next()
    },
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
    path: '/tracker/:order_id',
    component: () =>
      import(
        /* webpackChunkName: "tracker/order_id"*/ '../screens/Tracker.vue'
      ),
    beforeEnter: (to, from, next) => {
      if (to.params.order_id === undefined)
        next({
          name: 'notFound',
          params: {
            error: `Oops we couldn't find your order, are you sure you put in the right order id?`,
          },
        })

      next()
    },
  },
  {
    path: '/tracker',
    component: () =>
      import(/* webpackChunkName: "tracker"*/ '../screens/Tracker.vue'),
    name: 'tracker',
    props: true,
    beforeEnter: async (to, from, next) => {
      if (to.params.order === undefined) next({ name: 'home' })
      else next()
    },
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
    name: 'orders',
    meta: { showSideBar: true },
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
    meta: { showSideBar: true },
    component: () =>
      import(/* webpackChunkName: "stock"*/ '../screens/Stock.vue'),
    beforeEnter: async (to, from, next) => {
      const auth = getAuth()
      const idToken = await auth.currentUser?.getIdToken()

      const { admin } = await get('/user/admin', idToken)

      admin ? next() : next({ name: 'home' })
    },
  },
  {
    path: '/rating',
    meta: { showSideBar: true },
    component: () =>
      import(/* webpackChunkName: "register"*/ '../screens/Rating.vue'),
    beforeEnter: async (to, from, next) => {
      const auth = getAuth()
      const idToken = await auth.currentUser?.getIdToken()

      const { admin } = await get('/user/admin', idToken)

      admin ? next() : next({ name: 'home' })
    },
  },
  {
    path: '/orders/detail/:order_id',
    meta: { showSideBar: true },
    component: () =>
      import(
        /* webpackChunkName: "orders/detail/order_id"*/ '../screens/OrdersDetail.vue'
      ),
    beforeEnter: async (to, from, next) => {
      const auth = getAuth()
      const idToken = await auth.currentUser?.getIdToken()

      const { admin } = await get('/user/admin', idToken)

      admin ? next() : next({ name: 'home' })
    },
  },
  {
    path: '/orders/detail',
    name: 'orders/detail',
    meta: { showSideBar: true },
    component: () =>
      import(/* webpackChunkName: "orders"*/ '../screens/OrdersDetail.vue'),
    props: true,
    beforeEnter: async (to, from, next) => {
      const auth = getAuth()
      const idToken = await auth.currentUser?.getIdToken()

      const { admin } = await get('/user/admin', idToken)

      if (admin) {
        if (to.params.order === undefined) next({ name: 'orders' })
        next()
      } else {
        next()
      }
    },
  },
  // {
  //   path: '/order',
  //   component: () =>
  //     import(/* webpackChunkName: "register"*/ '../screens/Order.vue'),
  //   beforeEnter: async (to, from, next) => {
  //     const auth = getAuth()
  //     const idToken = await auth.currentUser?.getIdToken()

  //     const { admin } = await get('/user/admin', idToken)

  //     admin ? next() : next({ name: 'home' })
  //   },
  // },
  {
    path: '/account',
    component: () =>
      import(/* webpackChunkName: "account"*/ '../screens/Account.vue'),
    beforeEnter: async (to, from, next) => {
      const { user } = toRefs(useFirebase())

      ;(await user.value?.getIdToken()) ? next() : next({ name: 'home' })
    },
  },
  {
    path: '/:pathMatch(.*)*',
    component: () =>
      import(/* webpackChunkName: "notFound"*/ '../screens/NotFound.vue'),
    props: true,
    name: 'notFound',
  },
  {
    path: '/locations',
    component: () =>
      import(/* webpackChunkName: "test"*/ '../screens/Locations.vue'),
    name: 'locations',
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
