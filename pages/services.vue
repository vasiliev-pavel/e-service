<template>
  <div>
    <DropdownList
      v-for="category in filteredCategories"
      :key="category.category_id"
      :title="category.category_name"
      :items="category.services"
    />
    <div
      v-show="hasSelectedServices"
      class="flex justify-between items-center text-xl font-bold my-4"
    >
      <div>
        Общая сумма:
        <span class="text-green-500">{{ userStore.totalSum }} ₽</span>
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
// const routePairs = [{ from: "/services", to: "/booking" }];
const categories = businessStore?.categories || {};
const filteredCategories = computed(() => {
  const specialistServicesIds = userStore.selectedSpecialist?.services || [];

  const categories = businessStore?.categories || {};
  console.log(categories);
  return categories;

  // if (specialistServicesIds.length === 0) {
  //   // Если  специалист не выбран, возвращаем все категории
  //   return categories;
  // }
  // } else {
  //   const filtered = {};
  //   for (const [category, services] of Object.entries(categories)) {
  //     // Фильтрация услуг по id, которые есть у специалиста
  //     const filteredServices = services.filter((service) =>
  //       specialistServicesIds.includes(service.id)
  //     );
  //     // Если в категории есть услуги, добавляем её в объект filtered
  //     if (filteredServices.length > 0) {
  //       filtered[category] = filteredServices;
  //     }
  //   }
  //   return filtered;
  // }
});

// Вычисляемое свойство, которое возвращает true, если есть выбранные услуги
const hasSelectedServices = computed(() => {
  return Object.keys(userStore.selectedServices).length > 0;
});

// watchEffect(() => {
//   console.log(filteredCategories);
// });

// // Сброс состояния в случае если пользователь вернулся на предыдущую страницу
useRouteLeaveGuard();
</script>
