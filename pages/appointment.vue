<template>
  <div class="max-w-sm mx-auto p-6 bg-transparent">
    <!-- Conditional rendering based on whether the data is loaded -->
    <div v-if="!isLoaded">
      <!-- Skeleton placeholder -->
      <div class="flex items-center space-x-4">
        <USkeleton class="h-12 w-12" :ui="{ rounded: 'rounded-full' }" />
        <div class="space-y-2">
          <USkeleton class="h-4 w-[250px]" />
          <USkeleton class="h-4 w-[200px]" />
          <USkeleton class="h-4 w-[150px]" />
        </div>
      </div>
    </div>
    <div v-else>
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center">
          <img
            class="h-12 w-12 rounded-full mr-2"
            src="~/public/cat.jpg"
            alt="Avatar"
          />
          <div>
            <div class="font-bold text-lg">Альбина</div>
            <div class="text-sm text-gray-600">Парикмахер-стилист</div>
          </div>
        </div>
        <!-- The 'Edit' button seems not to be in the provided design -->
      </div>

      <div class="mb-4">
        <div class="text-gray-700 font-semibold">17 ноября, пятница</div>
        <div class="text-gray-500 text-sm">14:30-15:30, 1 ч</div>
      </div>

      <div class="mb-4">
        <div class="font-semibold">Стрижка короткие (комплекс)</div>
        <div class="text-gray-500">900 Р</div>
      </div>

      <div class="grid grid-cols-2 gap-4 mb-4">
        <div class="col-span-1">
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 mb-2"
            id="name"
            type="text"
            placeholder="Имя"
            value="Павел"
          />
        </div>
        <div class="col-span-1">
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 mb-2"
            id="phone"
            type="text"
            placeholder="Телефон"
            value="+7 986 907 36 47"
          />
        </div>
      </div>

      <div class="mb-4">
        <textarea
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100"
          id="comment"
          placeholder="Комментарий"
        >
необязательно</textarea
        >
        <!-- Changed placeholder to content inside textarea -->
      </div>

      <div class="flex items-center justify-between">
        <div class="text-xl font-semibold">1 услуга</div>
        <div class="text-xl font-semibold">900 Р</div>
      </div>

      <div class="mt-4">
        <button
          class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Подтвердить запись
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
// State to control when the content is loaded
const isLoaded = ref(false);

// Simulate data loading with a timeout
setTimeout(() => {
  isLoaded.value = true;
}, 2000); // 2 seconds loading simulation
</script>

<style scoped>
/* You can add page-specific styles here */
</style>
