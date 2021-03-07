import { Message, MessageBox } from "element-ui";
import NProgress from "nprogress"; // 全局进度条

export default ({ store, route, redirect, $axios }) => {
  // 配置全局apiUrl
  $axios.defaults.baseURL = process.env.BASE_URL;

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

  // $axios.onRequest((config) => {
  //   console.log("请求拦截器 server");
  //   return config;
  // });

  $axios.onResponse((response) => {
    if (process.client) {
      NProgress.done();
    }
    console.log("响应拦截器：", response);
    return response;
  });

  // 错误请求返回处理
  $axios.onError((error) => {
    MessageBox.alert(error.message, "服务器异常", {
      confirmButtonText: "重试",
      type: "warning",
    });
  });
};
