import Vue from 'vue'
import App from './App.vue'
// 引入jQuery
import $ from 'jquery'
// 引入自己封装的router配置文件
import router from './router'
import cookies from 'vue-cookies'
// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入semantic-ui
import SuiVue from 'semantic-ui-vue'
import 'semantic-ui-css/semantic.min.css'
// 引入公共css
import './assets/css/common.css'
// 引入封装好的axios请求
import { request } from '@/api/index'
// 引入vue事件总线bus
import bus from '@/utils/bus'

// 开发环境下会提供警告去查找错误,此条阻止启动生产模式的消息,以免增加应用的体积
Vue.config.productionTip = false

//通过vue.prototype去定义成他的实例对象,供全局使用
Vue.prototype.$cookies = cookies;
Vue.prototype.$request = request
Vue.prototype.$bus = bus

// Vue.use(),安装element-ui和semantic-ui
Vue.use(ElementUI)
Vue.use(SuiVue)


new Vue({
  render: h => h(App),
  router
}).$mount('#app')
