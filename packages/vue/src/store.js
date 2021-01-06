import Exit from './icons/Basic/Exit.vue';

export { Exit };

const PREFIX = 'i-';

export default {
  install(Vue) {
    Vue.component(PREFIX + Exit.name, Vue.extend(Exit));
  },
};
