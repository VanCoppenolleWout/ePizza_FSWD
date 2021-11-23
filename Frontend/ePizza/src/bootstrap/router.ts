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
    path: '/:id/detail',
    component: import('../screens/MenuItem.vue'),
  },
  //admin routes
  {
    path: '/orders',
    component: import('../screens/Orders.vue'),
    meta: {
      requiresAdmin: true,
    },
  },
]

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext,
  ) => {
    const auth = getAuth()
    const user = auth.currentUser

    const requiresAdmin = to.matched.some((record) => record.meta.requiresAdmin)
    if (requiresAdmin) {
    }
    next()
  },
)

export default router
