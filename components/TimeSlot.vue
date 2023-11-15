<template>
  <div class="flex flex-col items-center justify-center">
    <div
      v-for="period in filteredPeriodsByTime"
      :key="period.label"
      class="mb-4"
    >
      <div class="font-bold">{{ period.label }}</div>
      <div class="grid grid-cols-4 gap-2">
        <button
          v-for="time in period.times"
          :key="time"
          class="py-2 px-4 border rounded text-center cursor-pointer hover:bg-gray-100"
        >
          {{ time }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  filteredPeriods: {
    type: Array,
    default: () => [],
  },
  selectedDate: Date, // Добавляем prop для выбранной даты
});

const isToday = (date) => {
  const today = new Date();
  const selectedDay = new Date(date);
  return selectedDay.toDateString() === today.toDateString();
};

const getCurrentTime = () => {
  const now = new Date();
  return now.getHours() + now.getMinutes() / 60;
};

const filteredPeriodsByTime = computed(() => {
  // Проверяем, является ли выбранный день текущим
  if (isToday(props.selectedDate)) {
    const currentTime = getCurrentTime();

    // Фильтрация временных слотов внутри каждого блока для текущего дня
    return props.filteredPeriods
      .map((period) => {
        return {
          ...period,
          times: period.times.filter((time) => {
            const [hours, minutes] = time.split(":").map(Number);
            return hours + minutes / 60 >= currentTime;
          }),
        };
      })
      .filter((period) => period.times.length > 0);
  } else {
    // Возвращаем все периоды без фильтрации, если это не текущий день
    return props.filteredPeriods;
  }
});
</script>
