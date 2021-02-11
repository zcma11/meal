import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORY,
  RECEIVE_SHOPS,
  SET_USER_INFO,
  RESET_USER_INFO
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
  }
}
