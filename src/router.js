import Vue from "vue";
import Router from "vue-router";
import Login from "./pages/public/Login.vue";
import NotFound from "./pages/public/404.vue";

import Person from "./pages/person/Person.vue";

import FormDesignerModule from "./pages/devTools/FormDesignerModule.vue";

import Dashboard from "./pages/dashboard/Dashboard.vue";

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
      path: "/login",
      component: Login,
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
      path: "/",
      component: Dashboard,
      name: "Dashboard",
      meta: {
        title: "首页",
        affix: true,
      },
    },
    {
      path: "/person",
      component: Person,
      name: "Person",
      meta: {
        title: "员工管理",
      },
    },
    {
      path: "/form-designer",
      component: FormDesignerModule,
      name: "FormDesignerModule",
      meta: {
        title: "表单设计器",
      },
    },
  ],
  fallback: false,
  scrollBehavior: () => ({ y: 0 }),
};

export function createRouter() {
  return new Router(routerOptions);
}
