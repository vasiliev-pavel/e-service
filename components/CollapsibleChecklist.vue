<!-- CollapsibleChecklist.vue -->

<template>
  <div class="flex flex-col h-screen">
    <div v-for="(category, cIndex) in categories" :key="cIndex" class="mb-1">
      <button
        @click="toggleCategory(cIndex)"
        class="w-full text-left flex justify-between items-center px-4 py-2 bg-transparent rounded-md font-medium shadow-sm focus:outline-none text-xl"
      >
        <span>{{ category.name }}</span>
        <span>{{ category.isOpen ? "▼" : "▶" }}</span>
      </button>
      <div v-show="category.isOpen" class="mt-1 rounded-md overflow-hidden">
        <div
          class="flex items-center justify-between p-4 border-b border-gray-300"
          v-for="(service, sIndex) in category.services"
          :key="`service-${sIndex}`"
        >
          <label class="flex-1 flex items-center">
            <UCheckbox label="Label" :value="service.checked" />
            <span class="ml-3 text-sm text-gray-300">{{ service.name }}</span>
          </label>
          <span class="font-semibold text-gray-300">{{ service.price }} ₽</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  methods: {
    toggleCategory(index) {
      this.categories[index].isOpen = !this.categories[index].isOpen;
    },
  },
};
</script>

<!-- Add your styles here -->
<style scoped>
/* Your styles go here */
</style>
