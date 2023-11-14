<template>
  <div class="flex flex-col">
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
});

const getCurrentTime = () => {
  const now = new Date();
  return now.getHours() + now.getMinutes() / 60;
};

const filteredPeriodsByTime = computed(() => {
  const currentTime = getCurrentTime();

  // Фильтрация временных слотов внутри каждого блока
  const filteredPeriods = props.filteredPeriods.map((period) => {
    return {
      ...period,
      times: period.times.filter((time) => {
        const [hours, minutes] = time.split(":").map(Number);
        // Проверка, чтобы временной слот не был в прошлом
        return hours + minutes / 60 >= currentTime;
      }),
    };
  });

  // Удаление блоков, где нет доступных временных слотов
  return filteredPeriods.filter((period) => period.times.length > 0);
});
</script>
