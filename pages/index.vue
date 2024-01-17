<template>
  <SearchFilter />
  <SearchBody />
  <div>{{ userLocation }}></div>
  <button
    @click="test"
    class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
  >
    Log out
  </button>
</template>

<script setup>
import SearchBody from "~/components/user/SearchBody.vue";
import SearchFilter from "~/components/user/SearchFilter.vue";

definePageMeta({
  middleware: ["no-back-navigation"],
  layout: "user",
});

useHead({
  title: "Home Page",
  meta: [{ name: "description", content: "My amazing site." }],
});
const userLocation = ref({});

const user = useSupabaseUser();
const businessStore = useBusinessStore();
const userStore = useUserStore();
const { data } = await useFetch("/api/user/businesses");

watchEffect(async () => {
  if (user.value) {
    console.log(user.value);
    userStore.resetSelected();
  }

  if (data.value) businessStore.setBusiness(data.value);
});

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

const test = async () => {
  await getUserLocation();
};
useRouteLeaveGuard();
</script>
