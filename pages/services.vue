<template>
  <div>
    <DropdownList
      v-for="category in filteredCategories"
      :key="category.category_id"
      :title="category.category_name"
      :items="category.services"
      :specialistsWithSelectedService="specialistsWithSelectedService"
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
  const selectedSpecialist = userStore.selectedSpecialist ?? [];
  const categories = businessStore.selectedBusiness.categories
    ? businessStore.selectedBusiness.categories
    : {};

  if (selectedSpecialist.length === 0) {
    // Если  специалист не выбран, возвращаем все категории
    return categories;
  } else {
    // Иначе выбираем только те категории и данные, которые соответствуют специалисту
    const specialists = businessStore.selectedBusiness.specialists ?? [];

    // Убираем категории без услуг
    return (
      specialists
        .find((specialist) => specialist.id === selectedSpecialist.id)
        ?.categories.filter(
          (category) => category.services && category.services.length > 0
        ) ?? []
    );
  }
});

// Вычисляемое свойство, которое возвращает true, если есть выбранные услуги
const hasSelectedServices = computed(() => {
  return Object.keys(userStore.selectedServices).length > 0;
});

const specialistsWithSelectedService = computed(() => {
  const selectedServiceIds = Object.keys(userStore.selectedServices);
  const specialists = businessStore.selectedBusiness.specialists;

  return getMatchingSpecialists(specialists, selectedServiceIds);
});

watch(specialistsWithSelectedService, (newVal) => {
  // userStore.setSelectedSpecialist(newVal);
});

// // Сброс состояния в случае если пользователь вернулся на предыдущую страницу
useRouteLeaveGuard();
</script>
