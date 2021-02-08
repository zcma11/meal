import ajax from './ajax'

export const reqPosition = (geohash) => ajax(`/position/${geohash}`)
export const reqFoodCategory = () => ajax('/index_category')
export const reqShopList = (latitude, longitude) => ajax('/shops', { latitude, longitude })
export const reqrchShop = (geohash, keyword) => ajax('/search_shops', { keyword, geohash })
export const reqCaptcha = () => ajax('/captcha')
export const reqLogin = (name, pwd, captcha) => ajax('/login_pwd', { name, pwd, captcha }, 'POST')
export const reqMessage = (phone) => ajax('/sendcode', { phone })
export const reqSignInByPhone = (phone, code) => ajax('/login_sms', { phone, code }, 'POST')
export const reqUserinfo = () => ajax('/userinfo')
export const reqLoginOut = () => ajax('/logout')
