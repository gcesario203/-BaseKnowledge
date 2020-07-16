import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'
import App from './App.vue'

import store from './config/store'
import router from './config/router'
import './config/bootstrap'
import './config/msg'

Vue.config.productionTip = false

//TEMPORARIO PELO AMOR DE DEUS CESARIO DO FUTURO

require('axios').defaults.headers.common['Authorization']= 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MjIsIm5hbWUiOiJ2YWkgbWFubyIsImVtYWlsIjoiYWEyQGdtYWlsLmNvbSIsImFkbWluIjp0cnVlLCJpYXQiOjE1OTQ5Mzc3NTksImV4cCI6MTU5NTE5Njk1OX0.mScdWqoQkHVYAusiJOnfg34S0g-QCSJ5YDeAwlTu3Wc'

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
