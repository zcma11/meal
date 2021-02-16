import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORY,
  RECEIVE_SHOPS,
  RESET_USER_INFO,
  SET_USER_INFO,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  RECEIVE_GOODS,
  ADD_CART,
  SUB_CART,
  CLEAR_CART
} from './mutations-type'
import {
  reqPosition,
  reqFoodCategory,
  reqShopList,
  reqLoginOut,
  reqUserinfo,
  reqShopInfo,
  reqShopAppraise,
  reqShopGoods
} from '../api'

export default {
  async getAddress ({ commit, state }) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqPosition(geohash)
    if (result.code === 0) {
      const address = result.data
      commit(RECEIVE_ADDRESS, { address })
    }
  },
  async getFoodCategory ({ commit }) {
    const result = await reqFoodCategory()
    if (result.code === 0) {
      const category = result.data
      commit(RECEIVE_CATEGORY, { category })
    }
  },
  async getShopList ({ commit, state }) {
    const result = await reqShopList(state.latitude, state.longitude)
    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, { shops })
    }
  },
  async loginOut ({ commit }) {
    const result = await reqLoginOut()
    if (result.code === 0) {
      commit(RESET_USER_INFO)
    }
  },
  async autoLogin ({ commit }) {
    const result = await reqUserinfo()
    if (result.code === 0) {
      const userInfo = result.data
      commit(SET_USER_INFO, { userInfo })
    }
  },
  // mock
  async getShopInfo ({ commit }, { id }) {
    const result = await reqShopInfo()
    if (result.code === 0) {
      const info = result.data
      commit(RECEIVE_INFO, { id, info })
    }
  },
  async getShopComment ({ commit }, cb) {
    const result = await reqShopAppraise()
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, { ratings })
      cb && cb()
    }
  },
  async getShopGoods ({ commit }, { id, scrollInit }) {
    const result = await reqShopGoods()
    if (result.code === 0) {
      if (id !== 'no') {
        const goods = result.data
        commit(RECEIVE_GOODS, { id, goods })
      }
      scrollInit && scrollInit()
    }
  },
  chooseOne ({ commit }, { id }) {
    commit(RECEIVE_INFO, { id })
  },
  // cart
  updateCart ({ commit }, { id, isAdd, food }) {
    if (isAdd) {
      commit(ADD_CART, { id, food })
    } else {
      commit(SUB_CART, { id, food })
    }
  },
  clearCart ({ commit }, { id }) {
    commit(CLEAR_CART, { id })
  }
}
