import { Message } from "element-ui";
import NProgress from "nprogress"; // 全局进度条

export default ({ store, route, redirect, $axios }, inject) => {
  // 配置全局apiUrl
  $axios.defaults.baseURL = "http://localhost:7788";

  // 拦截请求
  $axios.interceptors.request.use(
    (config) => {
      // 全局进度条loading
      if (process.client) {
        NProgress.start();
      }
      if (store.getters.token && store.getters.token !== "null") {
        // 让每个请求携带自定义token
        config.headers.Authorization = store.getters.token;
      }
      return config;
    },
    (error) => {
      if (process.client) {
        // 请求出错
        Message({
          message: error.message,
          type: "error",
          duration: 5 * 1000,
        });
      }
      Promise.reject(error);
    }
  );

  $axios.onRequest((config) => {
    console.log("请求拦截器 server");

    return config;
  });

  $axios.onResponse((response) => {
    if (process.client) {
      NProgress.done();
    }
    console.log("响应拦截器：", response);
    return response;
  });

  // 错误请求返回处理
  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status);
    switch (code) {
      // 错误代码
      case 401:
        //         sessionStorage.clear();
        redirect("/login");
        break;
      case 403:
        //         sessionStorage.clear();
        redirect("/login");
        break;
      case 404:
        if (process.server) {
          redirect("/404");
        } else {
          Message.error(error.message);
          console.log("client 404");
          sessionStorage.clear();
        }

        break;
      case 500:
        Message.error("Server exception");
        break;
      case 502:
        Message.error("Bad Gateway");
        break;
      case 503:
        Message.error(error.message);
        break;
      case 504:
        Message.error(error.message);
        break;
      default:
        break;
    }
  });
};
