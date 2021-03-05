export default ({ store, redirect, route }) => {
  // consts
  const token = store.getters.token;
  const login = "/";
  console.log(route.path);
  console.log(!!token);
  // If the user is not authenticated
  if (!token) {
    return redirect(login);
  }

  if (token && route.path === login) {
    redirect("/admin");
  }
};
