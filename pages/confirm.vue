<script setup lang="ts">
import { watch } from "vue";

const loaderStore = useLoaderStore();
const user = useSupabaseUser();
const profileStore = useProfileStore();

watch(() => user.value, async (newUser, oldUser) => {
  if (newUser) {
    loaderStore.show();

    // Fetch Profile Data
    const profile = await profileStore.fetchMyProfile(newUser.id);

    if (profile.role === 'owner' || profile.role === 'specialist') {
      await profileStore.fetchMyBusinesses(newUser.id);
      navigateTo("/panel");
    } else if (profile.role === 'customer') {
      navigateTo("/");
    }

    // Скрыть загрузчик в любом случае
    loaderStore.hide();
  }
}, { immediate: true });

</script>
