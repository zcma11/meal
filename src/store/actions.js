import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORY,
  RECEIVE_SHOPS,
  RESET_USER_INFO,
  SET_USER_INFO
} from './mutations-type'
import {
  reqPosition,
  reqFoodCategory,
  reqShopList,
  reqLoginOut,
  reqUserinfo
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
  }
}
