import request from '../utils/request'

// 短信登录
export const loginPhone = (params) => {
  return request({
    url: '/login/cellphone',
    method: 'get',
    params
  })
}

// 登录状态
export const loginStatus = () => {
  return request({
    url: '/login/status',
    method: 'post',    
  })
}

// 登录状态
export const dailySignin = () => {
  return request({
    url: '/daily_signin',
    method: 'get',    
  })
}

// 退出登录
export const logout = () => {
  return request({
    url: '/logout',
    method: 'get',    
  })
}

// 二维码key生成
export const qrkey = () => {
  return request({
    url: '/login/qr/key',
    method: 'get',    
  })
}

// 二维码生成
export const qrCreate = (params) => {  
  return request({
    url: '/login/qr/create',
    method: 'get',    
    params
  })
}

// 二维码检测扫码状态
export const qrCheck = (params) => {
  return request({
    url: '/login/qr/check',
    method: 'get',    
    params
  })
}
