<template>
  <section
    class="bg-white shadow-md rounded-lg overflow-hidden my-1"
    v-if="hasItems"
  >
    <h2
      class="text-lg font-semibold text-gray-800 px-3 py-2 cursor-pointer hover:bg-gray-100"
      @click="isListOpen = !isListOpen"
    >
      {{ title }}
    </h2>
    <ul v-show="isListOpen" class="px-6 py-2 bg-gray-50">
      <li
        v-for="item in serviceIds"
        :key="item"
        class="flex items-center justify-between py-1"
        :class="{
          'text-disabl': !isServiceAvailable(item),
        }"
      >
        <label :for="item" class="flex items-center cursor-pointer">
          <input
            type="checkbox"
            :id="item"
            class="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
            :checked="userStore.selectedServices[item]"
            :disabled="!isServiceAvailable(item)"
            @change="
              () =>
                userStore.toggleCheckbox(
                  item,
                  props.items[item].name,
                  props.items[item].price,
                  props.items[item].duration,
                  title,
                  categoryId
                )
            "
          />
          <span class="ml-2 text-gray-700"
            >{{ props.items[item].name }} - {{ props.items[item].price }}$</span
          >
        </label>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  title: String,
  categoryId: String,
  items: Object,
  serviceIds: Array,
});

const userStore = useUserStore();
const businessStore = useBusinessStore();

const isListOpen = ref(false);
const specialistsById = businessStore.selectedBusiness.specialistsById || {};

const hasItems = computed(
  () => props.serviceIds && props.serviceIds.length > 0
);

const isServiceAvailable = (serviceId) => {
  // Список ID выбранных услуг
  const selectedServiceIds = Object.keys(userStore.selectedServices);
  if (!selectedServiceIds.includes(serviceId)) {
    selectedServiceIds.push(serviceId);
  }

  // Находим специалистов, которые могут предоставить каждую из выбранных услуг
  const availableSpecialists = Object.values(specialistsById).filter(
    (specialist) =>
      selectedServiceIds.every((id) => specialist.serviceIds.includes(id))
  );

  // Проверяем, есть ли специалисты, которые могут предоставить все выбранные услуги
  return availableSpecialists.length > 0;
};
</script>

<style scoped>
.text-disabl span {
  color: #a0aec0 !important; /* Пример серого цвета, указывающего на неактивность */
}
</style>
