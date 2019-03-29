import Api from '@/api/api'
import Router from '@/router/'
import Axios from 'axios'
import { Message } from 'element-ui'
import router from '@/router'

const baseRequest = Axios.create({})
baseRequest.defaults.withCredentials = true
// baseRequest.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 对所有的数据响应检查是否登录
baseRequest.interceptors.response.use(function (res) {
  if (res.data.err_code === 0) {
    return Promise.resolve(res.data.data)
  } else if (res.data.err_code === 106) {
    router.push({ name: 'login' })
  } else{
    return Promise.reject(res.data.err_msg)
  }
}, function (error) {
  if (!error.response) {
    Router.replace('/Login')
  }
  Message.error(error)
  return Promise.reject(error)
})

class Request {
  get (name, params) {
    return baseRequest.get(Api.getApi(name), {params: params})
      .then(function (res) {
        return Promise.resolve(res)
      })
      .catch(function (err) {
        return Promise.reject(err)
      })
  }

  post (name, data) {
    return baseRequest.post(Api.getApi(name), data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }})
      .then(function (res) {
        return Promise.resolve(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  }
}

export default new Request()
