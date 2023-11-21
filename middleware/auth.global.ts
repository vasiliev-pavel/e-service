// миддлварь чтобы не зареганым нельзя было переходить по другим путям кроме главной страницы

export default defineNuxtRouteMiddleware((to, _from) => {
  // const user = useSupabaseUser();
  // // Проверка, залогинен ли пользователь
  // if (!user.value) {
  //   return navigateTo("/login");
  // }
});
