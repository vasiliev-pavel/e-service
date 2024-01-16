<template>
  <div class="bg-transparent rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
    <div class="-mx-3 md:flex mb-6">
      <div class="md:w-full px-3">
        <h2 class="text-gray-200 text-lg mb-3">Специалисты</h2>
        <div class="flex flex-col">
          <!-- Специалисты отфильтрованные по выбранным услугам -->
          <div
            class="flex items-center mb-4 bg-slate-300 rounded-lg p-3 cursor-pointer hover:bg-slate-400 transition duration-300 ease-in-out"
            v-for="specialist in filteredSpecialists"
            :key="specialistsById[specialist].name"
            @click="selectSpecialist(specialist)"
          >
            <!-- src="`cat.jpg`" -->
            <div class="w-10 h-10 mr-3">
              <img
                class="rounded-full"
                :alt="specialistsById[specialist].name"
              />
            </div>
            <div class="flex flex-col">
              <span class="font-semibold text-gray-900">{{
                specialistsById[specialist].name
              }}</span>
              <span class="text-gray-600 text-sm">{{
                specialistsById[specialist].type
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "user",
});
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import { useBusinessStore } from "@/stores/business";
import { useRouteLeaveGuard } from "~/composables/useRouteLeaveGuard.js";
import { filterSpecialistsByServices } from "~/composables/filterSpecialistsByServices";

const router = useRouter();
const userStore = useUserStore();
const businessStore = useBusinessStore();
const specialistsById = businessStore.selectedBusiness.specialistsById || {};
const specialistIds = businessStore.selectedBusiness.specialistIds || [];

// Вычисляемое свойство для фильтрации специалистов или отображения всех специалистов
const filteredSpecialists = computed(() => {
  const selectedServiceIds = Object.keys(userStore.selectedServices);
  if (selectedServiceIds.length > 0) {
    const filteredIds = filterSpecialistsByServices(
      specialistIds,
      specialistsById,
      selectedServiceIds
    );

    userStore.setAvailableSpecialistIds(filteredIds);
    return filteredIds;
  } else {
    return specialistIds;
  }
});

function selectSpecialist(specialist) {
  userStore.setSelectedSpecialist({
    id: specialist,
    name: specialistsById[specialist].name,
    availability: specialistsById[specialist].availability,
  });

  if (Object.keys(userStore.selectedServices).length === 0) {
    router.push("/user/services"); // Перенаправление на страницу услуг, в случае если не выбраны услуги
  } else router.push("/user/book-appointment");
  // Перенаправление на страницу записи или другое действие
}

useRouteLeaveGuard();
</script>
