<template>
  <div
    class="flex flex-col items-center justify-center p-6 max-w-sm mx-auto m-3 bg-white rounded-xl shadow-md"
  >
    <div class="text-xl font-semibold text-gray-900">
      {{ selectedDay.day }} {{ selectedDay.month }} ваш специалист занят
    </div>
    <div class="text-gray-600">Но можно записаться к другому.</div>
    <div class="text-gray-600">Показать расписание всех специалистов?</div>
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
