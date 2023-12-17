<script setup lang="ts">
import { watch } from "vue";


const loaderStore = useLoaderStore();
const user = useSupabaseUser();
const profileStore = useProfileStore();

watch(
  user,
  async () => {
    // Показать загрузчик
    loaderStore.show();
    if (user.value) {
      // Fetch Profile Data
      const profile = await profileStore.fetchMyProfile(user.value.id);
      if (profile.role === 'owner') {
        await profileStore.fetchMyBusinesses(user.value.id);
        loaderStore.hide();
        navigateTo("/panel");
      }
      if (profile.role === 'specialist') {
        await profileStore.fetchMyBusinesses(user.value.id);
        loaderStore.hide();
        navigateTo("/panel");
      }
      if (profile.role === 'customer') {
        loaderStore.hide();
        navigateTo("/");
      }
    }
  },
  { immediate: true }
);
</script>

