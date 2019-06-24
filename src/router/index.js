import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
Vue.use(VueRouter);

/* Configure router */
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: "active"
});

export default router;
