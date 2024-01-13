<template>
  <SearchBody />
</template>

<script setup lang="ts">
import SearchBody from "~/components/user/SearchBody.vue";

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
    userStore.resetSelected();
  }
  if (data.value) businessStore.setBusiness(data.value);
});

useRouteLeaveGuard();
</script>
