import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'
import App from './App.vue'

import store from './config/store'
import router from './config/router'
import './config/bootstrap'
import './config/msg'
import './config/axios'
import './config/mq'

Vue.config.productionTip = false

//TEMPORARIO PELO AMOR DE DEUS CESARIO DO FUTURO

require('axios').defaults.headers.common['Authorization']= 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MjMsIm5hbWUiOiJra2siLCJlbWFpbCI6ImdAYS5jb20iLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTk2MjI0ODEwLCJleHAiOjE1OTY0ODQwMTB9.zA2I5ybsk32o8_a_Rvy13I4PIHKa0iU9_UW-s46X6a0'

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
