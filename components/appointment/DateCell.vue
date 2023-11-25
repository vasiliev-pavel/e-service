<template>
  <div
    @click="$emit('click', date)"
    class="flex flex-col items-center mx-1 bg-gray-700 rounded-lg w-9 px-1 py-1 cursor-pointer hover:bg-gray-600 hover:shadow-lg transition duration-300 ease-in-out"
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
defineProps(["date"]);
</script>
