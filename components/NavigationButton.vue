<template>
  <div>
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
      @click="handleClick"
    >
      {{ buttonText }}
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useUserStore } from "~/stores/user";
import { useRouter } from "vue-router";
import { filterSpecialistsByServices } from "~/composables/filterSpecialistsByServices";

const router = useRouter();
const userStore = useUserStore();
const businessStore = useBusinessStore();
const specialistsById = businessStore.selectedBusiness.specialistsById || {};
const specialistIds = businessStore.selectedBusiness.specialistIds || [];

// Определяем, какой маршрут и текст для кнопки использовать
const hasSelectedSpecialistAndServices = computed(() => {
  return (
    userStore.selectedSpecialist &&
    Object.keys(userStore.selectedServices).length > 0
  );
});

const handleClick = () => {
  const filteredIds = filterSpecialistsByServices(
    specialistIds,
    specialistsById,
    Object.keys(userStore.selectedServices)
  );

  userStore.setAvailableSpecialistIds(filteredIds);
  router.push(nextRoute.value); // Программно навигируем пользователя
};

const nextRoute = computed(() =>
  hasSelectedSpecialistAndServices.value
    ? "/user/book-appointment"
    : "/user/providers"
);

const buttonText = computed(() =>
  hasSelectedSpecialistAndServices.value
    ? "К выбору даты и времени"
    : "К выбору специалистов"
);
</script>
