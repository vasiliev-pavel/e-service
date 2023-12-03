<script setup lang="ts">
const client = useSupabaseClient();

const isOpen = ref(false);
const user = useSupabaseUser();
const user_role = ref('customer');

const panelTitle = computed(() => {
    if (user_role.value === 'admin') return 'Admin Panel';
    else if (user_role.value === 'owner') return 'Bussiness Dashboard';
    else if (user_role.value === 'specialist') return 'Specialist Dashboard';
    else return 'Customer Dashboard';
});

const menuItems = computed(() => {
    if (user_role.value === 'admin') {
        return [
            { title: 'Admin Link 1', icon: 'icon-name-1' },
            { title: 'Admin Link 2', icon: 'icon-name-2' }
        ];
    } else if (user_role.value === 'customer') {
        return [
            { title: 'Customer Link A', icon: 'icon-name-a' },
            { title: 'Customer Link B', icon: 'icon-name-b' }
        ];
    } else if (user_role.value === 'owner') {
        return [
            { title: 'Owner Link A', icon: 'icon-name-a' },
            { title: 'Owner Link B', icon: 'icon-name-b' }
        ];
    } else if (user_role.value === 'specialist') {
        return [
            { title: 'Specialist Link A', icon: 'icon-name-a' },
            { title: 'Specialist Link B', icon: 'icon-name-b' }
        ];
    }
});

const logout = async () => {
    await client.auth.signOut();
    navigateTo("/login");
};
</script>

<template>
    <div v-if="user">
        <UButton class="text-3xl" label="=" @click="isOpen = true" />

        <USlideover v-model="isOpen" side="left">
            <UCard @click="isOpen = false" class="flex flex-col flex-1"
                :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <template class="flex flex-col" #header>
                    <div class="flex items-center justify-between">
                        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                            {{ panelTitle }}
                        </h3>
                        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                            @click="isOpen = false" />
                    </div>
                </template>

                <nav class="flex flex-col">
                    <UButton class="flex my-4 p-4" v-for="item in menuItems" :key="item.title">
                        <i :class="item.icon"></i> {{ item.title }}
                    </UButton>
                </nav>

                <template class="flex flex-col" #footer>
                    <UButton class="flex my-4 p-4" @click="logout">
                        Logout
                    </UButton>
                </template>
            </UCard>
        </USlideover>
    </div>
</template>