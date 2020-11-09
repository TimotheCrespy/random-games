import { createRouter, createWebHistory } from 'vue-router'
import RandomGames from '../views/RandomGames.vue'

const routes = [
  {
    path: '/',
    redirect: { name: 'RandomGames' }
  },
  {
    path: '/random',
    name: 'RandomGames',
    component: RandomGames
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
