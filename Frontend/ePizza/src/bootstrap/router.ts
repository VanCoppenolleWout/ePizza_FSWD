import { getAuth } from '@firebase/auth'
import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  Router,
  RouteRecordRaw,
} from 'vue-router'
import useFirebase from '../composables/useFirebase'
import { fetchData } from '../composables/useNetwork'
import { useStore } from '../store/store'

const routes: RouteRecordRaw[] = [
  //global routes
  {
    path: '/',
    component: import('../screens/Landingpage.vue'),
    props: true,
    name: 'home',
  },
  {
    path: '/register',
    component: import('../screens/Register.vue'),
  },
  {
    path: '/login',
    component: import('../screens/Login.vue'),
  },
  {
    path: '/menu',
    component: import('../screens/Menu.vue'),
  },
  {
    path: '/order',
    component: import('../screens/Order.vue'),
  },
  {
    path: '/tracker',
    component: import('../screens/Tracker.vue'),
  },
  {
    path: '/detail',
    component: import('../screens/MenuItem.vue'),
  },
  //admin routes
  {
    path: '/orders',
    component: import('../screens/Orders.vue'),
    beforeEnter: async (to, from, next) => {
      const auth = getAuth()
      const idToken = await auth.currentUser?.getIdToken()

      const { get } = fetchData()
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
