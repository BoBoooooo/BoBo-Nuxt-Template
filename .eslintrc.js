module.exports = {
  root: true,
  plugins: ["prettier", "@typescript-eslint"],
  parserOptions: {
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  rules: {
    "no-console": 0,
    "require-await": 0,
    "no-unused-vars": 0,
    "no-useless-catch": 0,
  },
  extends: [
    "@nuxtjs",
    "plugin:nuxt/recommended",
    "plugin:prettier/recommended",
    "prettier",
  ],
  env: {},
  globals: {},
};
