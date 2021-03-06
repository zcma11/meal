import Vue from 'vue'
import VueRouter from 'vue-router'

// import HomePage from '../pages/HomePage/HomePage'
import Orders from '../pages/Orders/Orders'
import Profile from '../pages/Profile/Profile'
import Search from '../pages/Search/Search'
import Login from '../pages/Login/Login'
import ShopDetail from '../pages/ShopDetail/ShopDetail'
import ShopAppraise from '../pages/ShopDetail/ShopAppraise/ShopAppraise'
import ShopGoods from '../pages/ShopDetail/ShopGoods/ShopGoods'
import ShopInfo from '../pages/ShopDetail/ShopInfo/ShopInfo'

const HomePage = () => import('../pages/HomePage/HomePage')
Vue.use(VueRouter)

const routes = [
  {
    path: '/homepage',
    component: HomePage,
    meta: {
      ShowFooter: true
    }
  },
  {
    path: '/orders',
    component: Orders,
    meta: {
      ShowFooter: true
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      ShowFooter: true
    }
  },
  {
    path: '/search',
    component: Search,
    meta: {
      ShowFooter: true
    }
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/shopdetail',
    component: ShopDetail,
    children: [
      {
        path: 'appraise',
        component: ShopAppraise
      },
      {
        path: 'goods',
        component: ShopGoods,
        meta: {
          showCart: true
        }
      },
      {
        path: 'info',
        component: ShopInfo
      },
      {
        path: '',
        redirect: 'goods'
      }
    ]
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
