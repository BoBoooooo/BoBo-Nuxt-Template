import Vue from "vue";
import Router from "vue-router";
import Index from "@/pages/index.vue";
import About from "@/pages/about.vue";
import Login from "@/pages/public/Login.vue";
import NotFound from "@/pages/public/404.vue";

Vue.use(Router);

export function createRouter() {
  const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
      { path: "/", name: "index", component: Index },
      { path: "/about", name: "about", component: About },
      { path: "/login", name: "Login", component: Login },
      { path: "/404", name: "NotFound", component: NotFound },
    ],
  });

  return router;
}
