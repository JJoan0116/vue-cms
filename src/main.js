import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/element.js';
import './assets/css/global.css';
import './assets/fonts/iconfont.css';
import axios from 'axios';

axios.defaults.baseURL =
  'https://www.fastmock.site/mock/86a055afa09b0bc93b82739ede93db40/vue-cms/api';
axios.interceptors.request.use((config) => {
  config.headers.Authorization = window.sessionStorage.getItem('cms-vue-token');
  // 在最后必须 return config
  return config;
});
Vue.config.productionTip = false;
Vue.prototype.$http = axios;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
