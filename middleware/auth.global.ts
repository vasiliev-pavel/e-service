// миддлварь чтобы не зареганым нельзя было переходить по другим путям кроме главной страницы

export default defineNuxtRouteMiddleware(async (to, from) => {
  // const user = await getCurrentUser();
  // if (!user) {
  //   console.log("unlogged");
  //   if (to.path !== "/") return navigateTo("/");
  // } else {
  console.log("logged");
  // }
});
