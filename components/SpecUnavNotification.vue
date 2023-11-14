<template>
  <div class="bg-white shadow-md rounded-lg p-6 max-w-sm mx-auto my-10">
    <div class="text-gray-700">
      <p class="text-lg mb-3">
        {{ selectedDay.day }} {{ selectedDay.month }} ваш специалист занят
      </p>
      <p class="mb-1">Но можно записаться к другому.</p>
      <p class="mb-1">Показать расписание всех специалистов?</p>
    </div>
    <button
      class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
    >
      Давайте
    </button>
  </div>
</template>

<script setup>
defineProps({
  selectedDay: {
    type: Object,
    default: () => ({ day: 0, month: "undefined" }),
  },
});
</script>

<style>
/* Your custom styles here */
</style>
