/**
 * get请求一律get开头
 * post请求一律动作行为单词开头
 */
const base = '/api/'

class Api {
  /* 账号列表查询与相关操作 */
  login = 'UserC/Login'
  logout = 'UserC/Logout'
  /* 账号管理 */
  userInfoList = 'UserC/UserInfo' // 获取所有用户信息
  updCouponToUser = 'Coupon/UserInfo' // 优惠券指定给用户
  getCouponList = 'Coupon/GetCouponList' // 根据优惠券类型获取优惠券数据
  addCouponInfo = 'Coupon/AddCouponInfo' // 生成优惠券

  getApi (name) {
    return base + this[name]
  }
}

export default new Api()
