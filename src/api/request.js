import { service } from '@/api/index'

// 登录
export const login = params => {
  return service
    .post('/login', params)
    .then(res => res.data)
}


// 请求验证码
export const sendCode = params => {
  return service
    .post('/sendCode', params)
    .then(res => res.data)
}

// 注册
export const register = params => {
  return service
    .post('/register', params)
    .then(res => res.data)
}

// 获取用户信息
export const findStuInfo = params => {
  return service
    .post('/findStuInfo', params)
    .then(res => res.data)
}


// 修改密码
export const changePassword = params => {
  return service
    .post('/changePassword', params)
    .then(res => res.data)
}

// 预约
export const order = params => {
  return service
    .post('/do', params)
    .then(res => res.data)
}

// 查询预约
export const query = params => {
  return service
    .post('/query', params)
    .then(res => res.data,err => res.message)
}

// 个人预约信息查询
export const findAll = params => {
  return service
    .post('/findAll',params)
    .then(res => res.data)
}