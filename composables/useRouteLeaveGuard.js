import { onBeforeRouteLeave } from "vue-router";
import { useUserStore } from "~/stores/user";

export function useRouteLeaveGuard() {
  const userStore = useUserStore();

  onBeforeRouteLeave((to, from) => {
    // Сброс состояния при переходе с страницы провайдеров на страницу услуг, если выбраны услуги
    if (
      from.path === "/providers" &&
      to.path === "/services" &&
      Object.keys(userStore.selectedServices).length > 0
    ) {
      userStore.resetSelectedSpecialist();
    }

    // Сброс выбранного специалиста при переходе на страницу бронирования
    if (from.path === "/providers" && to.path === "/booking") {
      userStore.resetSelectedSpecialist();
    }

    // Сброс выбранных услуг при переходе с страницы услуг на страницу провайдеров, если выбран специалист
    if (
      from.path === "/services" &&
      to.path === "/providers" &&
      userStore.selectedSpecialist
    ) {
      userStore.resetSelectedServices();
    }

    // Сброс всего при переходе на страницу бронирования
    if (from.path === "/services" && to.path === "/booking") {
      userStore.resetSelectedServices();
      userStore.resetSelectedSpecialist();
    }
  });
}
