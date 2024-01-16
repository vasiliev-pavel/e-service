<template>
  <div class="p-6">
    <ul>
      <li
        v-for="salon in salonsData"
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
  </div>
  <div>
    <button
      class="text-white block p-4 rounded hover:bg-gray-50 hover:text-black"
      @click="sortSalonsByUserLocation"
    >
      Сортировать по расстоянию
    </button>

    <ul>
      <li
        class="text-white block p-4 rounded hover:bg-gray-50 hover:text-black"
        v-for="salon in salonsData"
        :key="salon.id"
      >
        {{ salon.name }} - Расстояние:
        {{
          salon.distance !== undefined
            ? salon.distance.toFixed(2)
            : "Неизвестно"
        }}
        км
      </li>
    </ul>
    <p>{{ userLocation }}</p>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const businessStore = useBusinessStore();
const router = useRouter();
const user = useUserStore();
const userLocation = ref(null);

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

// Те
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
  // getUserLocation();
  // sortSalonsByDistance(); // Вызов функции сортировки после получения местоположения пользователя
});

// const button = () => {
//   const { data: data } = useFetch("/api/user/appointments");
//   console.log(data.value);
// };

const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          userLocation.value = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error("Браузер не поддерживает геолокацию."));
    }
  });
};

// Функция для расчета расстояния между двумя точками (используется формула гаверсинуса)
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // радиус Земли в км
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Функция для сортировки салонов по расстоянию от пользователя
const sortSalonsByDistance = () => {
  console.log("До сортировки:", salonsData.value);

  salonsData.value.forEach((salon) => {
    salon.distance = calculateDistance(
      userLocation.value.latitude,
      userLocation.value.longitude,
      salon.latitude,
      salon.longitude
    );
  });

  salonsData.value.sort((a, b) => a.distance - b.distance);

  console.log("После сортировки:", salonsData.value);
};

const sortSalonsByUserLocation = async () => {
  if (!userLocation.value) {
    try {
      await getUserLocation();
      if (!userLocation.value) {
        console.error("Не удалось получить местоположение пользователя.");
        return;
      }
    } catch (error) {
      console.error("Ошибка при получении местоположения: ", error);
      return;
    }
  }
  sortSalonsByDistance();
};
</script>
