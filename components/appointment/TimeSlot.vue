<!-- //TimeSlot.vue -->

<template>
  <div class="flex flex-col items-center justify-center">
    <div
      v-for="period in props.filteredPeriods"
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
import { isToday } from "~/utils/appointmentUtils";

const props = defineProps({
  filteredPeriods: {
    type: Array,
    default: () => [],
  },
  selectedDate: Date, // Добавляем prop для выбранной даты
});
</script>
