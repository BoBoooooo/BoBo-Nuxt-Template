export default async function ({ store, route, redirect }) {
  const { name } = route;
  if (!name) {
    redirect("/404");
  }
  console.log("hello");
}
