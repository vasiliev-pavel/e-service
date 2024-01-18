<template>
  <div class="search-filter flex items-center space-x-2 p-6">
    <div class="flex-1 relative">
      <div class="absolute inset-y-0 left-0 flex items-center pl-3">
        <!-- Иконка поиска -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="20"
          height="20"
          viewBox="0 0 30 30"
        >
          <path
            d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"
          ></path>
        </svg>
      </div>
      <input
        v-model="searchQuery"
        @input="filterSalons"
        type="text"
        placeholder="Search..."
        class="block p-2 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    <button
      class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
      @click="sortSalonsByUserLocation"
    >
      nearby
    </button>
  </div>
  <div>{{ userLocation }}</div>
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
