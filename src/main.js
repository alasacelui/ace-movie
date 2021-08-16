import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import myhelpers from './plugins/helpers'

Vue.config.productionTip = false

// Importing the global css file
import "@/assets/css/customcss.css"

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
