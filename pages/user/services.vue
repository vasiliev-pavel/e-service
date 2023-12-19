<template>
  <div>
    <DropdownList
      v-for="category in filteredCategories"
      :key="category"
      :categoryId="category"
      :title="categoriesById[category].category_name"
      :items="categoriesById[category].servicesById"
      :serviceIds="categoriesById[category].serviceIds"
    />

    <div
      v-show="hasSelectedServices"
      class="flex justify-between items-center text-xl font-bold my-4"
    >
      <div>
        Общая сумма:
        <span class="text-green-500">{{ userStore.totalSum }} $</span>
      </div>
      <NavigationButton />
    </div>
  </div>
</template>

<script setup>
import DropdownList from "~/components/DropdownList.vue";
import NavigationButton from "~/components/NavigationButton.vue";

import { useUserStore } from "~/stores/user";
import { ref } from "vue";
import { useBusinessStore } from "~/stores/business";
import { useRouteLeaveGuard } from "~/composables/useRouteLeaveGuard.js";

const userStore = useUserStore();
const businessStore = useBusinessStore();

const selectedSpecialistId = userStore.selectedSpecialist?.id;
const categoriesById = businessStore.selectedBusiness.categoriesById || {};
const specialistsById = businessStore.selectedBusiness.specialistsById || {};
const categoryIds = businessStore.selectedBusiness.categoryIds || [];

const filteredCategories = computed(() => {
  if (!selectedSpecialistId) {
    // Если специалист не выбран, возвращаем все категории
    return categoryIds;
  } else {
    // Выбираем только те категории, которые соответствуют специалисту
    const specialist = specialistsById[selectedSpecialistId];

    if (specialist && specialist.categoryIds) {
      return specialist.categoryIds
        .map((categoryId) => categoriesById[categoryId])
        .filter(
          (category) =>
            category && category.serviceIds && category.serviceIds.length > 0
        );
    }
  }

  return [];
});

// Вычисляемое свойство, которое возвращает true, если есть выбранные услуги
const hasSelectedServices = computed(() => {
  return Object.keys(userStore.selectedServices).length > 0;
});

// Сброс состояния в случае если пользователь вернулся на предыдущую страницу
useRouteLeaveGuard();
</script>
