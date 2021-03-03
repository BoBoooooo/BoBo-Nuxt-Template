import { Message } from "element-ui";

export default ({ store, route, redirect, $axios }) => {
  $axios.onRequest((config) => {
    console.log("请求拦截器 server");

    return config;
  });

  $axios.onResponse((response) => {
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
          redirect("/login");
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
