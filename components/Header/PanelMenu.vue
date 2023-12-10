<script setup>

const user_role = ref('owner');

const menuItems = computed(() => {
    if (user_role.value === 'admin') {
        return [
            { title: 'Admin Link 1', url: '', icon: 'i-heroicons-cog-6-tooth-20-solid' },
            { title: 'Admin Link 2', url: '', icon: 'icon-name-2' },
            { title: 'Settings', url: '/panel/appointments', icon: 'i-heroicons-cog-6-tooth-20-solid' },
        ];
    } else if (user_role.value === 'customer') {
        return [
            { title: 'Customer Link A', url: '', icon: 'icon-name-a' },
            { title: 'Appointments', url: '', icon: 'i-heroicons-bookmark-square-20-solid' },
            { title: 'Settings', url: '/panel/appointments', icon: 'i-heroicons-cog-6-tooth-20-solid' },
        ];
    } else if (user_role.value === 'owner') {
        return [
            { title: 'Services', url: '/panel/services', icon: 'i-heroicons-scissors-20-solid' },
            { title: 'Appointments', url: '/panel/appointments', icon: 'i-heroicons-bookmark-square-20-solid' },
            { title: 'Settings', url: '/panel/appointments', icon: 'i-heroicons-cog-6-tooth-20-solid' },
        ];
    } else if (user_role.value === 'specialist') {
        return [
            { title: 'Services', url: '', icon: 'i-heroicons-scissors-20-solid' },
            { title: 'Appointments', url: '', icon: 'i-heroicons-bookmark-square-20-solid' },
            { title: 'Settings', url: '/panel/appointments', icon: 'i-heroicons-cog-6-tooth-20-solid' },
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