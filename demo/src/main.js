import Vue from 'vue';
import App from './App.vue';
import * as Icons from '@ease-icon/vue-basic';
import * as ShopIcons from '@ease-icon/vue-shop';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

const icons = { ...Icons, ...ShopIcons };

Vue.use(Icons.default);
Vue.use(ShopIcons.default);
delete icons.default;

Vue.prototype.icons = icons;

Vue.use(Element);

const vm = new Vue({
  render: h => h(App),
}).$mount('#app');

console.log(vm);
