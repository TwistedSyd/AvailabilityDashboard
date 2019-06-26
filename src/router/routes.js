/* Import general views */
import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";

/* Usefule/interactive pages */
import Dashboard from "@/pages/Dashboard.vue";
import AvailableTasks from "@/pages/AvailableTasks.vue";
import Login from "@/pages/Login.vue";
import Checklist from "@/pages/Checklist.vue"

/* Define paths and names for each page */
const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/login",
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
        path: "checklist",
        name: "checklist",
        component: Checklist
    },
      {
        path: "login",
        name: "login",
        component: Login
      }
    ]
  },
  {
    path: "*",
    component: Login,
    redirect: "/login"
  }
];

export default routes;
