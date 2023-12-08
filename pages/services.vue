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

const filteredCategories = computed(() => {
  const specialistServicesIds = userStore.selectedSpecialist?.services || [];
  const categories = businessStore.selectedBusiness.categories
    ? businessStore.selectedBusiness.categories
    : {};

  if (specialistServicesIds.length === 0) {
    // Если  специалист не выбран, возвращаем все категории
    return categories;
  } else {
    // Иначе выбираем только те категории и данные, которые соответствуют специалисту
    return businessStore.selectedBusiness.categories
      .map((category) => {
        // Фильтрация услуг в каждой категории по id, которые есть у специалиста
        const filteredServices = category.services.filter((service) =>
          specialistServicesIds.includes(service.id)
        );
        return {
          ...category,
          services: filteredServices,
        };
      })
      .filter((category) => category.services.length > 0); // Убираем категории без услуг
  }
});

// Вычисляемое свойство, которое возвращает true, если есть выбранные услуги
const hasSelectedServices = computed(() => {
  return Object.keys(userStore.selectedServices).length > 0;
});

// watchEffect(() => {
//   console.log(filteredCategories);
// });

onMounted(() => {
  if (!process.client) return;

  const businessesData = localStorage.getItem("businesses");
  const categoriesData = localStorage.getItem("categories");

  if (businessesData) businessStore.setBusiness(JSON.parse(businessesData));
  if (categoriesData) businessStore.setCategories(JSON.parse(categoriesData));
});

// // Сброс состояния в случае если пользователь вернулся на предыдущую страницу
useRouteLeaveGuard();
</script>
