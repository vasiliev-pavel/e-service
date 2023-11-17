import { defineNuxtRouteMiddleware } from "nuxt/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "~/firebaseInit";

//тут происходит ошибка из за того что navigateTo находится вне компонента nuxt3
export default defineNuxtRouteMiddleware((to, from) => {
  // skip middleware on server
  if (process.server) return;
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // Пользователь залогинен, продолжаем навигацию
      console.log("logged");
    } else {
      console.log("unlogged");
      // Пользователь не залогинен, перенаправляем на главную страницу
      //   return navigateTo("/");
    }
  });

  //   });
});
