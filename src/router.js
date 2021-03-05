import Vue from "vue";
import Router from "vue-router";
import Index from "./pages/index";
import Dashboard from "./pages/admin/dashboard";
import Admin from "./pages/admin";
import Settings from "./pages/admin/settings";
import NotFound from "./pages/404";

const emptyFn = () => {};
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort);
};

Vue.use(Router);

export const routerOptions = {
  mode: "history",
  base: decodeURI("/"),
  routes: [
    {
      path: "/",
      component: Index,
      name: "index",
      hidden: true,
    },
    {
      path: "/404",
      component: NotFound,
      name: "NotFound",
      hidden: true,
    },
    {
      path: "/admin",
      component: Admin,
      name: "admin",
      hidden: true,
    },
    {
      path: "/admin/dashboard",
      component: Dashboard,
      name: "dashboard",
      meta: {
        title: "Dashboard",
        icon: "menu",
        affix: true,
      },
    },
    {
      path: "/admin/settings",
      component: Settings,
      name: "settings",
      meta: {
        title: "Settings",
        icon: "setting",
      },
    },
  ],
  fallback: false,
  scrollBehavior: () => ({ y: 0 }),
};

export function createRouter() {
  return new Router(routerOptions);
}
