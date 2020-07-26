import axios from 'axios'
import { Loading, Message, MessageBox } from '@zyf2e/capsule-ui'
import { getBaseUrl } from './utils'

const setToken = (token) => (localStorage.token = token)
// 是否正在刷新的标记
let isLoading = false
let loadingInstance = null

const loadingShow = () => {
  if (isLoading) return
  isLoading = true
  loadingInstance = Loading.service({
    text: '正在努力加载中....',
    fullscreen: false,
    background: 'transparent'
  })
}
const loadingClose = () => {
  if (!isLoading || !loadingInstance) return
  isLoading = false
  loadingInstance.close()
}

const messageTip = (params) => {
  if (tyApp()) params = { ...params, customClass: 'mobile', duration: 2000 }
  Message(params)
}

export default (baseURL) => {
  const request = axios.create({
    baseURL,
    timeout: 60000,
    withCredentials: true, // cookie跨域必备
    headers: {
      'Content-Type': 'application/json'
    }
  })
  // http request 拦截器 Request
  request.interceptors.request.use(
    (config) => {
      // loadingShow()
      const { url, method } = config
      // 只能是开头是api的才能替换
      const reg = /^\/api\//
      if (reg.test(url)) {
        config.url = url.replace('/api/', `${baseUrl}/`)
      }
      if (method === 'get') {
        config.params = config.data
        config.data = {}
      }
      return config
    },
    (error) => {
      Promise.reject(error)
    }
  )

  // http response 拦截器 Response
  request.interceptors.response.use(
    (response) => {
      loadingClose()
      const res = response.data
      if (res.success === void 0 && res.ok === void 0) {
        return res
      }
      // C端重构的接口不走网关
      if (res.success !== void 0) {
        if (res.success === false) {
          const message = res.error ? res.error.message : res.message
          messageTip({
            message,
            type: 'error',
            duration: 5000
          })
        }
        return response.data
      }

      if (!res.ok) {
        const message = res.error ? res.error.message : res.message
        if (tyApp() && res.error.code === 'DTOCTO_ABSENCE_OUT_OF_SERVICE') {
          MessageBox.alert(res.error.message, {
            confirmButtonText: '确定',
            customClass: 'mobile',
            // center: true,
            confirmButtonClass: 'mobile-alert-btn',
            callback: (action) => {}
          })
        } else {
          messageTip({
            message,
            type: 'error',
            duration: 5000
          })
        }
        return Promise.reject(res)
      } else {
        return response.data.result !== undefined ? response.data.result : response.data
      }
    },
    (error) => {
      loadingClose()
      if (!error.response) return Promise.reject(error)
      const response = error.response
      const message = response.data.error ? response.data.error.message : '请求错误'
      if (response.status === 401) {
        messageTip({
          message,
          type: 'error',
          duration: 5000
        })
        return location.replace(response.data.error.detail)
      } else {
        messageTip({
          message,
          type: 'error',
          duration: 5000
        })
        return Promise.reject(error)
      }
    }
  )

  /**
   * []请求
   * @param params  参数
   * @param operation     接口
   */
  function customRequest(url, method, data) {
    const datatype = method.toLocaleLowerCase() === 'get' ? 'params' : 'data'
    return request({
      url: url,
      method: method,
      [datatype]: data
    })
  }

  return { request, customRequest }
}
