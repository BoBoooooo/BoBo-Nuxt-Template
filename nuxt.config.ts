// const path = require("path");
// const webpack = require("webpack");
const pkg = require("./package");

module.exports = {
  mode: "universal",
  srcDir: "src/",
  // typescript: {
  //   typeCheck: {
  //     eslint: true
  //   }
  // },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  // axios: {
  //   baseURL: `${blogConfig.enableHTTPS ? 'https' : 'http'}://127.0.0.1:${blogConfig.port}`,
  //   browserBaseURL: '/'
  // },
  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },

  /*
   ** Global CSS
   */
  css: [
    "element-ui/lib/theme-chalk/index.css",
    // 'element-pro-crud/lib/ProCrud.css'
  ],

  /** middleware */
  router: {
    middleware: ["router-guards"],
  },

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {
      src: "~/plugins/element-ui.ts",
    },
    {
      src: "~/plugins/axios.ts",
      mode: "server",
    },
    {
      src: "~/plugins/global.ts",
    },
    // {
    //   src: '~/plugins/element-pro-crud.ts'
    // },
  ],

  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/router", "@nuxtjs/axios"],
  buildModules: ["@nuxt/typescript-build"],

  /*
   ** Build configuration
   */

  build: {
    extractCSS: true,
    vendor: ["element-ui"],
    babel: {
      plugins: [
        [
          "component",
          {
            libraryName: "element-ui",
            styleLibraryName: "theme-chalk",
          },
        ],
      ],
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push(
          {
            enforce: "pre",
            test: /\.(js|vue)$/,
            loader: "eslint-loader",
            exclude: /(node_modules)/,
            options: {
              fix: true,
            },
          },
          {
            test: /\.ts$/,
            exclude: [/node_modules/, /vendor/, /\.nuxt/],
            loader: "ts-loader",
            options: {
              appendTsSuffixTo: [/\.vue$/],
              transpileOnly: true,
            },
          }
        );
      }
    },
  },
};
