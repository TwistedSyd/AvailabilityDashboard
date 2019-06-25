/* Need to import Vue */
import Vue from "vue";
import App from "./App";
import router from "./router/index";

/* Layout imports */
import PaperDashboard from "./plugins/paperDashboard";
import "vue-notifyjs/themes/default.css";
import ToggleSwitch from "vuejs-toggle-switch";

/* Import firebase, firestore, and vuefire */
import VueFire from "vuefire";
import firebase from "firebase";
import "firebase/firestore";

/* Use bootstrap plugin */
import { ModalPlugin } from "bootstrap-vue";
import { FormGroupPlugin } from "bootstrap-vue";
Vue.use(FormGroupPlugin);
Vue.use(ModalPlugin);

/* Initialize firebase database and tell Vue what to use */
Vue.config.productionTip = false;
Vue.use(VueFire);
Vue.use(PaperDashboard);
Vue.use(ToggleSwitch);

const firebaseConfig = {
  apiKey: "AIzaSyAkVHPDMgaC_17MuxfHRvOf2lSZAq0fw6o",
  authDomain: "availability-dashboard.firebaseapp.com",
  databaseURL: "https://availability-dashboard.firebaseio.com",
  projectId: "availability-dashboard",
  storageBucket: "availability-dashboard.appspot.com",
  messagingSenderId: "325857607385",
  appId: "1:325857607385:web:ffee71c954bba213"
};
firebase.initializeApp(firebaseConfig);

/* Get database ready to use */
export const db = firebase.firestore();

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
