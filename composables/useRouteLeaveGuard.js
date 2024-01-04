export function useRouteLeaveGuard() {
  const userStore = useUserStore();
  onBeforeRouteLeave((to, from) => {
    const isLeavingProviders = from.path === "/user/providers";
    const isLeavingBookAppoint = from.path === "/user/book-appointment";
    const isLeavingServices = from.path === "/user/services";
    const isGoingToServices = to.path === "/user/services";
    const isGoingToProviders = to.path === "/user/providers";
    const isGoingToBooking = to.path === "/user/booking";

    const hasSelectedServices =
      Object.keys(userStore.selectedServices).length > 0;
    const hasSelectedSpecialist = !!userStore.selectedSpecialist;
    if (isLeavingBookAppoint && isGoingToServices) {
      userStore.resetSelectedSpecialist();
    }
    if (
      // Сброс состояния при переходе с страницы провайдеров на страницу услуг, если выбраны услуги
      (isLeavingProviders && isGoingToServices && hasSelectedServices) ||
      // Сброс выбранного специалиста при переходе на страницу бронирования
      (isLeavingProviders && isGoingToBooking)
    ) {
      userStore.resetSelectedSpecialist();
    }

    if (
      // Сброс выбранных услуг при переходе с страницы услуг на страницу провайдеров, если выбран специалист
      (isLeavingServices && isGoingToProviders && hasSelectedSpecialist) ||
      // Сброс всего при переходе на страницу бронирования
      (isLeavingServices && isGoingToBooking)
    ) {
      userStore.resetSelectedSpecialist();
      userStore.resetSelectedServices();
    }
  });
}
