const getters = {
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  user: (state) => state.auth.user,
  token: (state) => state.user.token,
  avatar: () => "https://img.imgdb.cn/item/60445435cef1ec5e6fa6a939.gif",
};
export default getters;
