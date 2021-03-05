import cookieparser from "cookieparser";
export default {
  actions: {
    nuxtServerInit({ commit }, { req }) {
      if (process.server && process.static) return;
      if (!req.headers.cookie) return;
      const parsed = cookieparser.parse(req.headers.cookie);
      console.log(parsed);
      const token = parsed.token;
      if (!token) return;
      commit("user/SET_TOKEN", token);
    },
  },
};
