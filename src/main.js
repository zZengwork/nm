// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import Cookie from "@/tools/cookie"
import './config/rem.js'
//淘宝rem布局方案
// import './config/flexible-0.3.2.js'
// import './config/adaptive-0.1.2.js'
/* eslint-disable no-new */
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

// router.beforeEach((to, from, next) =>{
//     if(to.meta.requireAuth){ //是否需要登录拦截
//         if(Cookie.get('uid')){ //已登录
//             next()
//         }else{
//             next({
//                 path: '/',
//                 query: {redirect : to.fullPath}
//             })
//         }
//     }else{
//         next()
//     }
// })