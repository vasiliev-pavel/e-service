<script setup>
const profileStore = useProfileStore();
const user_role = profileStore?.myProfile?.role;

// https://heroicons.com/


const menuItems = computed(() => {
    if (user_role === 'admin') {
        return [
            { title: 'Appointments', url: '/panel', icon: 'i-heroicons-clipboard-20-solid' },
        ];
    } else if (user_role === 'customer') {
        return [
            { title: 'Appointments', url: '/user/appointments', icon: 'i-heroicons-clipboard-20-solid' },
        ];
    } else if (user_role === 'owner') {
        return [
            { title: 'Dashboard', url: '/panel', icon: 'i-heroicons-squares-2x2-20-solid' },
            { title: 'Appointments', url: '/panel/appointments', icon: 'i-heroicons-clipboard-20-solid' },
            { title: 'Services & Categories', url: '/panel/services', icon: 'i-heroicons-scissors-20-solid' },
            { title: 'Specialists', url: '/panel/specialists', icon: 'i-heroicons-users-20-solid' },
        ];
    } else if (user_role === 'specialist') {
        return [
            { title: 'Appointments', url: '/panel', icon: 'i-heroicons-clipboard-20-solid' },
        ];
    }
});
</script>
<template>
    <nav class="flex flex-col">
        <UButton class="flex my-4 p-4" v-for="item in menuItems" :key="item.title" :to="item.url">
            <i :class="item.icon"></i> {{ item.title }}
        </UButton>
    </nav>
</template>