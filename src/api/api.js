/**
 * get请求一律get开头
 * post请求一律动作行为单词开头
 */
const base = '/api/UserC/'
// const base = 'https://kyls.csytgj.com/'

// 请求方式：post
//
// 2.获取研究生列表
// 请求地址：http://localhost:20020/user/getPostgraduateInfoList?pageSize=10&pageNum=1
//   请求方式：get
//
// 3.获取研究生的详细信息
// 请求地址：http://localhost:20020/user/getPostgraduateDetailInfoByUserId?pgUserId=14
//   请求方式：get
//
// 4.更新研究生状态 待审核研究生
// 请求地址：http://localhost:20020/user/updatePostgraduateStatus?pgUserId=2
//   请求方式：get
//
// 5.研究生投诉接口
// 请求地址：http://localhost:20020/complain/list?pageSize=10&pageNum=1
//   请求方式：get
//
// 6.本科生反馈
// 请求地址：http://localhost:20020//feedback/list?pageSize=10&pageNum=1
//   请求方式：get
//
// 7.问题列表
// 请求地址：http://localhost:20020/question/list?pageNum=1&pageSize=10
//   请求方式：get
//
// 8.获取课程详情
// 请求地址：http://localhost:20020/question/detail?questionId=114
//   请求方式：get

// 请求地址：localhost:20020/question/checkRewardQuestion?questionId=114&status=0
//   请求方式：get

class Api {
  /* 账号列表查询与相关操作 */
  login = 'Login'
  logout = 'logout'
  /* 账号管理 */
  getPostgraduateInfoList = 'user/getPostgraduateInfoList' // .获取研究生列表
  getPostgraduateDetailInfoByUserId = 'user/getPostgraduateDetailInfoByUserId' // .获取研究生的详细信息
  updatePostgraduateStatus = 'user/updatePostgraduateStatus' // 更新研究生状态
  getComplainList = 'complain/list' // 研究生投诉接口
  getFeedbackList = 'feedback/list' // 本科生反馈
  getQuestionList = 'question/list' // 本科生反馈
  getInviteInfoList = 'inviteInfo/list' // 本科生反馈
  getQuestionDetail = 'question/detail' // 本科生反馈
  checkRewardQuestion = 'question/checkRewardQuestion' // localhost
  getApi (name) {
    return base + this[name]
  }
}

export default new Api()
