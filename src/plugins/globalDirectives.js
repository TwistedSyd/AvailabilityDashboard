import { directive as vClickOutside } from "vue-clickaway";
import { VBTooltip } from "bootstrap-vue";

const GlobalDirectives = {
  install(Vue) {
    Vue.directive("click-outside", vClickOutside);
    Vue.directive("b-tooltip", VBTooltip);
  }
};

export default GlobalDirectives;
