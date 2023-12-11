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
            :key="specialist.name"
            @click="selectSpecialist(specialist)"
          >
            <div class="w-10 h-10 mr-3">
              <img
                class="rounded-full"
                :src="`cat.jpg`"
                :alt="specialist.name"
              />
            </div>
            <div class="flex flex-col">
              <span class="font-semibold text-gray-900">{{
                specialist.name
              }}</span>
              <span class="text-gray-600 text-sm">{{ specialist.type }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import { useBusinessStore } from "@/stores/business";
import { useRouteLeaveGuard } from "~/composables/useRouteLeaveGuard.js";

const router = useRouter();
const userStore = useUserStore();
const businessStore = useBusinessStore();

// Вычисляемое свойство для фильтрации специалистов или отображения всех специалистов
const filteredSpecialists = computed(() => {
  // Если selectedServices не пуст, фильтруем специалистов
  if (Object.keys(userStore.selectedServices).length > 0) {
    //Ищем совпадения по выбранному сервису у всех специалистов
    //чтобы потом отообразить их в провайдерах
    const selectedServiceIds = Object.keys(userStore.selectedServices);
    const specialists = businessStore.selectedBusiness.specialists;

    return getMatchingSpecialists(specialists, selectedServiceIds);
  } else {
    // Если selectedServices пуст, возвращаем всех специалистов
    return businessStore.selectedBusiness.specialists
      ? businessStore.selectedBusiness.specialists
      : undefined;
  }
});

function selectSpecialist(specialist) {
  userStore.setSelectedSpecialist({
    id: specialist.id,
    name: specialist.name,
    availability: specialist.availability,
  });

  if (Object.keys(userStore.selectedServices).length === 0) {
    router.push("/services"); // Перенаправление на страницу услуг, в случае если не выбраны услуги
  } else router.push("/book-appointment");
  // Перенаправление на страницу записи или другое действие
}

useRouteLeaveGuard();
</script>
