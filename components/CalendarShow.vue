<template>
  <div class="flex flex-col items-center m-5">
    <div class="flex w-full justify-between items-center mb-2">
      <div class="flex-grow text-left font-bold">
        <span v-if="visibleMonths.length === 1">{{ visibleMonths[0] }}</span>
        <span v-else>{{ visibleMonths.join(" - ") }}</span>
      </div>
      <div class="flex-grow-0">
        <button
          @click="scroll(-1)"
          :disabled="isPrevDisabled"
          class="p-2 disabled:opacity-50"
        >
          <span>&lt;</span>
        </button>
        <button
          @click="scroll(1)"
          :disabled="isNextDisabled"
          class="p-2 disabled:opacity-50"
        >
          <span>&gt;</span>
        </button>
      </div>
    </div>
    <div class="flex justify-center">
      <div
        v-for="date in visibleDates"
        :key="date.toString()"
        class="flex flex-col items-center mx-1 bg-gray-700 rounded-lg w-9 px-4 py-1"
      >
        <div class="text-white text-xs">
          {{ date.toLocaleDateString("ru-RU", { weekday: "short" }) }}
        </div>
        <div class="bg-gray-700 flex items-center justify-center h-6">
          {{ date.getDate() }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// Функция для генерации дат на семь недель вперед от текущего дня
function generateDates() {
  const dates = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Устанавливаем начало дня
  const endPeriod = new Date(today);
  endPeriod.setDate(today.getDate() + 7 * 7); // Добавляем 7 недель

  for (let date = today; date < endPeriod; date.setDate(date.getDate() + 1)) {
    dates.push(new Date(date));
  }
  return dates;
}

const allDates = ref(generateDates());
const visibleCount = 7;
const startIndex = ref(0);
const endIndex = ref(visibleCount); // Конечный индекс видимых дат

const visibleDates = computed(() => {
  return allDates.value.slice(startIndex.value, endIndex.value);
});

const visibleMonths = computed(() => {
  const months = visibleDates.value.map((date) =>
    date.toLocaleString("ru-RU", { month: "long" })
  );
  return [...new Set(months)];
});

const isPrevDisabled = computed(() => startIndex.value === 0);
const isNextDisabled = computed(() => endIndex.value >= allDates.value.length);

function scroll(direction) {
  const increment = visibleCount * direction;
  startIndex.value = Math.max(startIndex.value + increment, 0);
  endIndex.value = Math.min(endIndex.value + increment, allDates.value.length);
  // Обновляем видимые месяцы после прокрутки
  visibleMonths.value = [
    ...new Set(
      allDates.value
        .slice(startIndex.value, endIndex.value)
        .map((date) =>
          date.toLocaleString("ru-RU", { month: "long", year: "numeric" })
        )
    ),
  ];
}
</script>
