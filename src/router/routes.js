/* Import general views */
import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";

/* Usefule/interactive pages */
import Dashboard from "@/pages/Dashboard.vue";
import AvailableTasks from "@/pages/AvailableTasks.vue";
import Login from "@/pages/Login.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard
      },
      {
        path: "available-tasks",
        name: "available-tasks",
        component: AvailableTasks
      },
      {
        path: "login",
        name: "login",
        component: Login
      }
    ]
  },
  { path: "*", component: DashboardLayout, redirect: "/dashboard" }
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
