<template>
  <div>
    <DropdownList
      v-for="(items, title) in categories"
      :key="title"
      :title="title"
      :items="items"
    />
    <div
      v-show="hasSelectedServices"
      class="flex justify-between items-center text-xl font-bold my-4"
    >
      <div>
        Общая сумма:
        <span class="text-green-500">{{ userStore.totalSum }} ₽</span>
      </div>
      <NuxtLink to="/providers">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          К выбору специалистов
        </button>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import DropdownList from "~/components/DropdownList.vue";
import { useUserStore } from "~/stores/user";
import { ref } from "vue";
import { useBusinessStore } from "~/stores/business";

const userStore = useUserStore();
const businessStore = useBusinessStore();
const categories = businessStore.businessData.categories;

// Вычисляемое свойство, которое возвращает true, если есть выбранные услуги
const hasSelectedServices = computed(() => {
  return Object.keys(userStore.selectedServices).length > 0;
});
</script>
