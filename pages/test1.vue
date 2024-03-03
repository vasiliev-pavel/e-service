<template>
  <div
    class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4"
  >
    <div class="flex-shrink-0">
      <!-- Image goes here -->
      <img class="h-48 w-48" src="/cat.jpg" alt="Cappuccino" />
    </div>
    <div>
      <div class="flex space-x-2 mt-2">
        <div class="text-center">
          <div class="text-sm text-gray-600">250 мл</div>
        </div>
        <div class="text-center">
          <div class="text-sm text-gray-600">350 мл</div>
        </div>
        <div class="text-center">
          <div class="text-sm text-gray-600">450 мл</div>
        </div>
      </div>
      <div class="text-xl font-medium text-black">Капучино</div>
      <p class="text-gray-500">Классический кофе с молочной пенкой</p>

      <div class="flex justify-between items-center mt-4">
        <div class="text-2xl font-bold">$15</div>
        <button
          class="px-4 py-2 bg-blue-500 text-white text-xs font-bold uppercase rounded"
        >
          Добавить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CappuccinoCard",
  // component logic
};
</script>

<style scoped>
/* Add any additional styling here */
</style>
