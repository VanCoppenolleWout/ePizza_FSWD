import {
  createRouter,
  createWebHistory,
  Router,
  RouteRecordRaw,
} from 'vue-router'

const routes: RouteRecordRaw[] = [
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
]

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
