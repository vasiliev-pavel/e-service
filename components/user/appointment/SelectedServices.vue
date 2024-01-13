<template>
  <div class="services-container space-y-4 mb-4">
    <div
      v-for="(service, id) in selectedServices"
      :key="id"
      class="flex justify-between items-center p-2 border border-gray-200 rounded text-gray-400"
    >
      <div class="flex flex-col">
        <span class="service-name font-medium">{{ service.name }}</span>
        <span class="service-price font-bold"> {{ service.price }} $ </span>
      </div>

      <button
        v-if="canRemoveService"
        @click="removeService(id)"
        class="remove-service-button p-2 text-red-500"
      >
        &#10005;
      </button>
    </div>
  </div>
</template>

<script setup>
// Импорт ref из Vue, если нужно реактивное свойство
import { ref } from "vue";
const userStore = useUserStore();

const props = defineProps({
  selectedServices: Object, // Добавляем prop для выбранной даты
});

const canRemoveService = computed(() => {
  return Object.keys(props.selectedServices).length > 1;
});

const removeService = (serviceId) => {
  userStore.removeSelectedServices(serviceId);
  // Удаляем сервис из объекта selectedServices
};
</script>
