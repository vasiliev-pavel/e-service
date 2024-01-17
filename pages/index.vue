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

<script setup lang="ts">
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
const userLocation = ref(null);

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
const test = async () => {
  userLocation.value = await getUserLocation();
};
useRouteLeaveGuard();
</script>
