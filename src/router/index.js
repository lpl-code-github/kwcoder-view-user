// router配置
import Vue from 'vue'
import Router from 'vue-router'

// Vue.use(),安装Router
Vue.use(Router)

//使用ES提出的方法：路由懒加载，优化前端页面（不过此处只有一个路由）
const routes = [{
	path: '/',
	component: () => import('@/views/pageContainer/index')
}]


//这里使用了history模式，这种模式充分利用 history.pushState API来完成URL跳转而无须重新加载页面
//但是有个问题,刷新页面报404,线上部署解决方案:http://developer-help.cn/blog/30
const router = new Router({
	mode: 'history',
	// base: process.env.BASE_URL,
	// mode:'hash',// 打包app需要修改
	routes
})

//暴露router供main.js全局调用
export default router
