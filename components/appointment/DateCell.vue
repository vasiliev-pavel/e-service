<template>
  <div
    @click="$emit('click', date)"
    :class="[
      'flex flex-col items-center mx-1 rounded-lg w-full px-1 py-1 cursor-pointer transition duration-300 ease-in-out flex-grow',
      isSelected
        ? 'bg-blue-500 hover:bg-blue-400'
        : 'bg-gray-700 hover:bg-gray-600 hover:shadow-lg',
    ]"
  >
    <div class="text-white text-xs">
      {{ date.format("ddd") }}
    </div>
    <div class="flex items-center justify-center h-7 text-white">
      {{ date.date() }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  date: Object,
  isSelected: Boolean,
});
</script>
