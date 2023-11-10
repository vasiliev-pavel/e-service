<template>
  <div>
    <NuxtLink :to="nextRoute">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
      >
        {{ buttonText }}
      </button>
    </NuxtLink>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useUserStore } from "~/stores/user";

const userStore = useUserStore();

// Определяем, какой маршрут и текст для кнопки использовать
const hasSelectedSpecialistAndServices = computed(() => {
  return (
    userStore.selectedSpecialist &&
    Object.keys(userStore.selectedServices).length > 0
  );
});

const nextRoute = computed(() =>
  hasSelectedSpecialistAndServices.value ? "/appointment" : "/providers"
);

const buttonText = computed(() =>
  hasSelectedSpecialistAndServices.value
    ? "К выбору даты и времени"
    : "К выбору специалистов"
);
</script>
