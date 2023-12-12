export default defineNuxtRouteMiddleware((to, from) => {
  if (from.fullPath === "/" && to.fullPath === "/user/appointment")
    return abortNavigation();

  // console.log(to.fullPath);

  // }
});
