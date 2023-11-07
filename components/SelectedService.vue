<template>
  <div
    v-if="selectedServices.length > 0"
    class="fixed bottom-0 left-0 right-0 shadow-md py-4 px-6 border-t-2 border-gray-100 bg-gray-950"
  >
    <div class="flex justify-between items-center">
      <div>
        <p class="text-sm font-semibold text-gray-700">
          Выбрано услуг:
          <span class="text-blue-600">{{ selectedServices.length }}</span>
        </p>
        <p class="text-lg font-bold text-gray-800">Общая сумма:</p>
        <p class="text-lg font-bold text-gray-800">
          <span class="text-blue-600">{{ totalSum }} ₽</span>
        </p>
      </div>
      <NuxtLink to="/providers">
        <button
          @click="chooseSpecialist"
          class="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-200"
        >
          К выбору специалиста
        </button></NuxtLink
      >
    </div>
  </div>
</template>

<script>
export default {
  props: ["selectedServices"],
  computed: {
    totalSum() {
      return this.selectedServices.reduce(
        (sum, service) => sum + service.price,
        0
      );
    },
  },
  methods: {
    chooseSpecialist() {
      // Logic to choose a specialist
      console.log("Переход к выбору специалиста");
    },
  },
};
</script>

<!-- <style scoped>
  .selected-services-summary {
    /* Styles for your summary component */
  }
  </style> -->
