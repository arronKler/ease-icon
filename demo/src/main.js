import Vue from 'vue';
import App from './App.vue';
import * as Icons from '@ease-icon/vue';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

const icons = { ...Icons };

delete icons.default;

Vue.use({
  install(Vue) {
    for (let key of Object.keys(icons)) {
      const comp = icons[key];
      Vue.component('I' + comp.name, comp);
    }
  },
});

Vue.prototype.icons = icons;

Vue.use(Element);

const vm = new Vue({
  render: h => h(App),
}).$mount('#app');

console.log(vm);
