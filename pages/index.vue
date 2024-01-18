<template>
  <SearchFilter />
  <SearchBody />
  <div>{{ user }}></div>
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

useRouteLeaveGuard();
</script>
