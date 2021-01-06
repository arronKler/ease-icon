import Close from "./icons/Basic/Close";
import Exit from "./icons/Basic/Exit";
import OffScreen from "./icons/Basic/OffScreen";
export {
Close,
Exit,
OffScreen,
}


  export default {
    install(Vue) {
      Vue.component('I' + Close.name, Vue.extend(Close))
Vue.component('I' + Exit.name, Vue.extend(Exit))
Vue.component('I' + OffScreen.name, Vue.extend(OffScreen))

    }
  }
  