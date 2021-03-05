const getters = {
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  user: (state) => state.user,
  token: (state) => state.user.token,
  avatar: () =>
    "https://lh3.googleusercontent.com/proxy/rYITq3lywIMstBCXDjCeYfiyjcITu5ByyXVkOEO27JdvN0xaWx2ThItrDk1tDCFY7GmVt68ldtCel7j-rzbJN-nVQsmRn7NhjXCe1f8dX_x2f8A",
};
export default getters;
