import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import Upload2 from '../packages/upload2';

import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Upload2)

new Vue({
  render: h => h(App),
}).$mount('#app')
