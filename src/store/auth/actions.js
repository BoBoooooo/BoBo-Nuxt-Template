import Cookie from "js-cookie";
export default {
  login({ commit }, data) {
    // eslint-disable-next-line no-useless-catch
    try {
      // // check user
      // await this.$fireAuth.signInWithEmailAndPassword(data.email, data.password)

      // // get JWT from firebase
      // const token = await this.$fireAuth.currentUser.getIdToken()
      // const { email, uid } = this.$fireAuth.currentUser

      // // set jwt to cookies
      // Cookie.set('access_token', token)

      // // set localy
      commit("SUCCESS_AUTH", { email: "123", uid: "123" });
      this.$router.push("/admin");
    } catch (err) {
      throw err;
    }
  },
  async logout({ commit }) {
    await this.$fireAuth.signOut();
    await Cookie.remove("access_token");
    location.href = "/";
    commit("LOG_OUT");
  },
};
