export default {
  SUCCESS_AUTH(state, data) {
    state.user = data;
  },
  LOG_OUT(state) {
    state.user = null;
  },
};
