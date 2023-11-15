<template>
  <div class="flex flex-col items-center justify-center p-6 max-w-sm mx-auto">
    <div class="font-semibold text-gray-200 text-lg">
      На {{ selectedDay.day }} {{ selectedDay.month }} не записаться
    </div>
    <div class="text-gray-300">Выберите другую дату или услугу</div>
    <button
      class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
    >
      Вернуться к услугам
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
