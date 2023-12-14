<script setup lang="ts">

const isOpen = ref(false);
const user = useSupabaseUser();
const profileStore = useProfileStore();
const user_role = profileStore?.myProfile?.role;

const menuTitle = computed(() => {
    if (user_role === 'admin') return 'Admin Panel';
    else if (user_role === 'owner') return 'Bussiness Dashboard';
    else if (user_role === 'specialist') return 'Specialist Dashboard';
    else return 'Customer Dashboard';
});


</script>

<template>
    <div v-if="user" class="flex justify-between align-center">
        <UButton class="text-3xl my-4 p-4" trailing-icon="i-heroicons-bars-3-20-solid" @click="isOpen = true" />

        <HeaderBusinessButton v-if="user_role === 'owner'" />
        <span />

        <USlideover v-model="isOpen" side="left">
            <UCard @click="isOpen = false" class="flex flex-col flex-1"
                :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <template class="flex flex-col" #header>
                    <div class="flex items-center justify-between">
                        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                            {{ menuTitle }}
                        </h3>
                        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                            @click="isOpen = false" />
                    </div>
                </template>

                <HeaderPanelMenu />

                <template class="flex flex-col" #footer>
                    <HeaderLogoutButton />
                </template>
            </UCard>
        </USlideover>
    </div>
</template>