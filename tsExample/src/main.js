import Vue from 'vue';
import ElementUI from 'element-ui';
import { routesConfig } from '@/router/routes';
import App from './App.jsx';
import store from './store';
import router from './router';
import VueModel from './plugins/vue-mdf';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/common.less';
import './registerServiceWorker';

Vue.config.productionTip = false;

Vue.use(ElementUI, {});
Vue.use(VueModel, {
  store,
  router,
  routesConfig,
});

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#root');
