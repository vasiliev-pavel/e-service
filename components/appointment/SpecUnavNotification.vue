<template>
  <div
    class="flex flex-col items-center justify-center p-6 max-w-sm mx-auto m-3"
  >
    <div class="font-semibold text-gray-200 text-center text-lg pb-3">
      {{ selectedDay.day }} {{ selectedDay.month }} ваш специалист занят.
    </div>
    <div class="text-gray-300 text-center">Но можно записаться к другому.</div>
    <div class="text-gray-300 text-sm text-center">
      Показать расписание всех специалистов?
    </div>
    <button
      class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
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
