// 引入axios
import axios from 'axios'
// 引入element的Message提示组件 和 loading组件
import {
	Message,
	Loading
} from 'element-ui'

//axios打开允许跨域携带cookie信息
axios.defaults.withCredentials=true

// 引入封装好的接口模块
import * as request from './request.js'

// loading的变量
let loadingInstance

// 请求超时时间
axios.defaults.timeout = 100000

const service = axios.create({
	// 建文服务器地址
	// baseURL: 'https://kwcoder.club:9000', 
	
	// 李鹏龙阿里云服务器2地址
	// baseURL: 'http://121.199.44.171:9000',
	
	// 本地后端地址
	baseURL: 'http://localhost:9000'
})


// 请求拦截器(在请求之前进行一些配置)
service.interceptors.request.use(
	config => {
		// 如果请求是post请求,请求信息为json格式
		if (config.method === 'post') {
			config.headers['Content-Type'] = 'application/json'
		}
		// config.headers.Authorization = utils.getCookie('token')
		
		//加载loading
		loadingInstance = Loading.service({ 
			fullscreen: true,
			lock: true,
			spinner: 'el-icon-loading',
			background: 'rgba(0, 0, 0, 0.7)'
		})
		
		return config
	},
	err => {
		// Promise.reject()方法返回一个带有拒绝原因的Promise对象
		return Promise.reject(err)
	}
)

// 响应拦截器(响应之后对数据做一些处理)
service.interceptors.response.use(
	response => {
		// res为响应体
		const res = response.data
		// 关闭loading
		loadingInstance.close()
		// 如果响应体中的success为false
		if (!res.success) {
			// 使用element ui的错误提示 显示res中的message
			Message.error({
				message: res.message
			})
			return
		}
		// 否则返回响应体
		return response.data
	},
	error => {
		// const { data } = error.response
		// 关闭loading
		loadingInstance.close()
		// 请求超时
		if (error.message.indexOf('timeout') !== -1) {
			Message.error({
				message: '请求超时，请稍后再试'
			})
		} else {
			Message.error({
				message: '服务器异常，请稍后再试'
			})
		}
	}
)

// 暴露request service
export {
	request,
	service
}
