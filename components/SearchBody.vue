<template>
  <div class="p-6">
    <ul>
      <li
        v-for="salon in businessStore.businesses.data"
        :key="salon.id"
        class="border-b last:border-b-0"
      >
        <!-- Add an @click handler to save the selected salon and navigate -->
        <a
          @click="selectSalon(salon)"
          class="text-white block p-4 rounded hover:bg-gray-50 hover:text-black"
        >
          <p class="font-semibold">{{ salon.name }}</p>
        </a>
      </li>
    </ul>
    <!-- <a
      @click="button()"
      class="text-white block p-4 rounded hover:bg-gray-50 hover:text-black"
    >
      <p class="font-semibold">Сообщение</p>
    </a> -->
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const businessStore = useBusinessStore();
const router = useRouter();
const user = useUserStore();

const selectSalon = (salon) => {
  businessStore.selectedSalonId = salon.id;
  // Save the selected salon to local storage
  user.setSelectedSalon({ id: salon.id, title: salon.name });
  // localStorage.setItem("selectedSalon", JSON.stringify(salon));
  // Navigate to a new page, for example, '/salon-details'
  router.push("/user/booking");
};

onMounted(async () => {
  if (!process.client) return;
  businessStore.resetSelected();
});

const button = () => {
  const { data: data } = useFetch("/api/user/appointments");
  console.log(data.value);
};
</script>
