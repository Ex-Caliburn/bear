/**
 * get请求一律get开头
 * post请求一律动作行为单词开头
 */
const base = '/api/'

class Api {
  /* 账号列表查询与相关操作 */
  login = 'UserC/Login'
  logout = 'UserC/Logout'
  /* 优惠券 */
  userInfoList = 'UserC/UserInfo' // 获取所有用户信息
  updCouponToUser = 'Coupon/UpdCouponToUser' // 优惠券指定给用户
  getCouponList = 'Coupon/GetCouponList' // 根据优惠券类型获取优惠券数据
  addCouponInfo = 'Coupon/AddCouponInfo' // 生成优惠券
  UpdCouponActivity = 'Coupon/UpdCouponActivity' // 修改优惠券活动信息
  addCouponInfo = 'Coupon/AddCouponActivity' // 添加优惠券活动
  GetCouponActivityList = 'Coupon/GetCouponActivityList' // 获取优惠券活动列表
  /* 优惠券 */
  getGoodsList = 'Goods/GoodsList' // 获取商品列表信息
  addGoodsInfo = 'Goods/AddGoodsInfo' // 添加商品信息
  delGoodsInfo = 'Goods/DelGoodsInfo' // 删除商品信息
  updateGoodsInfo = 'Goods/UpdateGoodsInfo' // 更新商品信息
  getApi (name) {
    return base + this[name]
  }
}

export default new Api()
