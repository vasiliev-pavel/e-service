<template>
  <div class="search-filter">
    <input
      v-model="searchQuery"
      @input="filterSalons"
      type="text"
      placeholder="Поиск салона"
      class="search-input"
    />

    <button
      class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      @click="sortSalonsByUserLocation"
    >
      Фильтр по расстоянию
    </button>
  </div>
  <div>{{ salonsData }}</div>
</template>

<script setup>
import { ref } from "vue";
import { calculateDistance, getUserLocation } from "~/utils/location";

const businessStore = useBusinessStore();
const userStore = useUserStore();
const searchQuery = ref("");
const userLocation = ref(null);
//test data
const salonsData = ref([
  {
    id: 1,
    name: "Салон Красоты Аврора",
    latitude: 55.363324,
    longitude: 50.627361,
  }, // Москва,

  {
    id: 2,
    name: "Элегантный Образ",
    latitude: 55.359973,
    longitude: 50.643615,
  },
  { id: 3, name: "Гламурный Стиль", latitude: 55.366811, longitude: 50.646083 },
  { id: 4, name: "Модный Рай", latitude: 55.354008, longitude: 50.658682 },
  { id: 5, name: "Лучший Вид", latitude: 55.371624, longitude: 50.63957 },
  { id: 6, name: "Звездный Лук", latitude: 55.366222, longitude: 50.606721 },
]);

const sortSalonsByUserLocation = async () => {
  if (!userLocation.value) {
    try {
      userLocation.value = await getUserLocation();
    } catch (error) {
      console.error("Ошибка при получении местоположения: ", error);
      return;
    }
  }

  console.log("До сортировки:", salonsData.value);
  //   businessStore.salons.forEach((salon) => {
  salonsData.value.forEach((salon) => {
    salon.distance = calculateDistance(
      userLocation.value.latitude,
      userLocation.value.longitude,
      salon.latitude,
      salon.longitude
    );
  });
  console.log("После сортировки:", salonsData.value);

  salonsData.value.sort((a, b) => a.distance - b.distance);
  //   businessStore.salons.sort((a, b) => a.distance - b.distance);
};
</script>
