import Vue from 'vue'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORY,
  RECEIVE_SHOPS,
  SET_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  RECEIVE_GOODS,
  ADD_CART,
  SUB_CART,
  CLEAR_CART,
  SET_SEARCH_RESULT
} from './mutations-type'

export default {
  [RECEIVE_ADDRESS] (state, { address }) {
    state.address = address
  },
  [RECEIVE_CATEGORY] (state, { category }) {
    state.category = category
  },
  [RECEIVE_SHOPS] (state, { shops }) {
    state.shops = shops
  },
  [SET_USER_INFO] (state, { userInfo }) {
    state.userInfo = userInfo
  },
  [RESET_USER_INFO] (state) {
    state.userInfo = {}
  },
  [SET_SEARCH_RESULT] (state, { searchResult }) {
    state.searchResult = searchResult
  },
  // mock
  [RECEIVE_INFO] (state, { id, info }) {
    state.info = { ...state.info, [id]: info }
  },
  [RECEIVE_RATINGS] (state, { id, ratings }) {
    Vue.set(state.comment, id, ratings)
  },
  [RECEIVE_GOODS] (state, { id, goods }) {
    Vue.set(state.goods, id, goods)
  },
  // cart
  [ADD_CART] (state, { id, food }) {
    // 判断 没有就创建
    if (!food.count) {
      Vue.set(food, 'count', 1)
    } else {
      food.count++
    }
    // 同上
    if (!state.shopCart[id]) {
      Vue.set(state.shopCart, id, [food])
    } else {
      food.count > 1 || state.shopCart[id].push(food)
    }
  },
  [SUB_CART] (state, { id, food }) {
    food.count > 0 && food.count--
    // 只留下 count > 0 的
    state.shopCart[id] = state.shopCart[id].filter(food => food.count > 0)
  },
  [CLEAR_CART] (state, { id }) {
    state.shopCart[id].map(food => {
      food.count = 0
    })
    state.shopCart[id] = []
  }
}
