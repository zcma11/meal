import ajax from './ajax'

const BASE_URL = '/api'

export const reqPosition = (geohash) => ajax(`${BASE_URL}/position/${geohash}`)
export const reqFoodCategory = () => ajax(BASE_URL + '/index_category')
export const reqShopList = (latitude, longitude) => ajax(BASE_URL + '/shops', { latitude, longitude })
export const reqSearchShop = (geohash, keyword) => ajax(BASE_URL + '/search_shops', { keyword, geohash })
export const reqLoginByPwd = (name, pwd, captcha) => ajax(BASE_URL + '/login_pwd', { name, pwd, captcha }, 'POST')
export const reqMessage = (phone) => ajax(BASE_URL + '/sendcode', { phone })
export const reqLoginByMsg = (phone, code) => ajax(BASE_URL + '/login_sms', { phone, code }, 'POST')
export const reqUserinfo = () => ajax(BASE_URL + '/userinfo')
export const reqLoginOut = () => ajax(BASE_URL + '/logout')

// mock
export const reqShopGoods = () => ajax('/goods')
export const reqShopInfo = () => ajax('/info')
export const reqShopAppraise = () => ajax('/appraise')
