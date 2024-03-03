<template>
  <div style="height: 1500px">
    <SearchFilter />
    <SearchBody />
    <div>{{ user }}></div>
  </div>
</template>

<script setup>
import SearchBody from "~/components/user/SearchBody.vue";
import SearchFilter from "~/components/user/SearchFilter.vue";
onMounted(() => {
  if (process.client) {
    window.addEventListener("scroll", handleScroll);
  }
});
function handleScroll() {
  console.log(window.scrollY);
}
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
    // console.log(user.value);
    userStore.resetSelected();
  }

  if (data.value) businessStore.setBusiness(data.value);
});

useRouteLeaveGuard();
</script>
