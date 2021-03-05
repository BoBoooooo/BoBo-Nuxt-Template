import Vue from "vue";
import Router from "vue-router";
import Child from "@/layouts/empty_child.vue";
import Login from "./pages/public/Login.vue";
import NotFound from "./pages/public/404.vue";

import Person from "./pages/person/Person.vue";
import Dict from "./pages/devTools/Dict.vue";
import TableDesignerModule from "./pages/devTools/TableDesignerModule.vue";

import FormDesignerModule from "./pages/devTools/FormDesignerModule.vue";
import Dept from "./pages/system/Dept.vue";
import Role from "./pages/system/Role.vue";
import Users from "./pages/system/Users.vue";

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
      path: "/dev-tools",
      component: Child,
      name: "DevTools",
      meta: {
        title: "开发人员工具",
      },
      children: [
        {
          path: "/dev-tools/form-designer",
          name: "FormDesignerModule",
          component: FormDesignerModule,
          meta: { title: "表单设计" },
        },
        {
          path: "/dev-tools/table-designer",
          name: "TableDesignerModule",
          component: TableDesignerModule,
          meta: { title: "表格设计" },
        },
        {
          path: "/dev-tools/dict",
          name: "Dict",
          component: Dict,
          meta: { title: "字典管理" },
        },
      ],
    },
    {
      path: "/system",
      name: "System",
      component: Child,
      meta: {
        title: "系统管理",
      },
      children: [
        {
          path: "/system/users",
          component: Users,
          name: "Users",
          meta: {
            title: "用户管理",
          },
        },
        {
          path: "/system/dept",
          component: Dept,
          name: "Dept",
          meta: {
            title: "部门管理",
          },
        },
        {
          path: "/system/role",
          component: Role,
          name: "Role",
          meta: {
            title: "角色管理",
          },
        },
      ],
    },
  ],
  fallback: false,
  scrollBehavior: () => ({ y: 0 }),
};

export function createRouter() {
  return new Router(routerOptions);
}
