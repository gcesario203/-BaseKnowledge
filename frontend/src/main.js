import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'
import App from './App.vue'

import store from './config/store'
import router from './config/router'
import './config/bootstrap'

Vue.config.productionTip = false

//TEMPORARIO PELO AMOR DE DEUS CESARIO DO FUTURO

require('axios').defaults.headers.common['Authorization']= 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6OSwibmFtZSI6Ikp1bGlvIiwiZW1haWwiOiJhYWFhMjIyMjIyQGdtYWlsLmNvbSIsImFkbWluIjp0cnVlLCJpYXQiOjE1OTQ2NzcwMDQsImV4cCI6MTU5NDkzNjIwNH0.tq0I_pcHgccHhhZ3mruEkB_hFpduXnWOyDakGMy-xOE'

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
