import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      redirect: '/screen'
    },
    {
      path: '/screen',
      name: 'screen',
      component: () => import('../views/Screen/index.vue'),
    }
  ]
})

export default router
