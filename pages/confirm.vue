<script setup lang="ts">
import { watch } from "vue";

const loaderStore = useLoaderStore();
const user = useSupabaseUser();
const profileStore = useProfileStore();
watch(
  user,
  () => {
    if (user.value) {
      return navigateTo("/");
    }
  },
  { immediate: true }
);

// watch(
//   () => user.value,
//   async (newUser, oldUser) => {
//     if (newUser) {
//       navigateTo("/");

// loaderStore.show();

// // Fetch Profile Data
// const profile = await profileStore.fetchMyProfile(newUser.id);

// if (profile.role !== "owner" || profile.role !== "specialist") {
//   navigateTo("/");
// } else {
//   await profileStore.fetchMyBusinesses(newUser.id);
//   navigateTo("/panel");
// }

// // Скрыть загрузчик в любом случае
// loaderStore.hide();
// }
//   },
//   { immediate: true }
// );
</script>
