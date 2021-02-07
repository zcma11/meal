import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../pages/HomePage/HomePage'
import Orders from '../pages/Orders/Orders'
import Profile from '../pages/Profile/Profile'
import Search from '../pages/Search/Search'

Vue.use(VueRouter)

const routes = [
  {
    path: '/homepage',
    component: HomePage
  },
  {
    path: '/orders',
    component: Orders
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/',
    redirect: '/homepage'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
