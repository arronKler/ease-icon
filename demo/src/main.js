import Vue from 'vue';
import App from './App.vue';
import EaseIcons from '@ease-icon/vue';

Vue.config.productionTip = false;
/* console.log(Exit.name);
Vue.use({
  install(Vue) {
    Vue.component('I' + Exit.name, Exit);
    Vue.component('I' + OffScreen.name, OffScreen);
  },
}); */

Vue.use(EaseIcons);

const vm = new Vue({
  render: h => h(App),
}).$mount('#app');

console.log(vm);
