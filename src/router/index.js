import { createRouter, createWebHistory } from 'vue-router'
import RandomGames from '../views/RandomGames.vue'

const routes = [
  {
    path: '/',
    name: 'RandomGames',
    component: RandomGames
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
