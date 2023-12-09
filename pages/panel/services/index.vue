<script setup>
const user = useSupabaseUser();
const userID = user.value.id;

const services = ref([]);

const { data } = await useFetch('/api/services/get_all', {
    method: 'POST',
    body: { owner_id: userID }
});

services.value = data?.value?.data;
console.log(services)


</script>
<template>
    <!-- Нужно доставать сервисы по компаниям, от выбранной компании -->
    <div class="flex flex-col">
        <UBadge class="my-4" color="primary" variant="subtle" size="lg">Services</UBadge>
        <UButton class="my-2" size="lg" to="/panel/services/create">Create</UButton>
        <UCard class="my-6 text-white" v-for="service in services" :key="service.id">
            <p><strong>Name:</strong> {{ service.name }}</p>
            <p><strong>Price:</strong> {{ service.price }}</p>
            <p><strong>Duration:</strong> {{ service.duration }}</p>
            <UButton color="red" @click="deleteService(service.id)">Delete</UButton>
        </UCard>
    </div>
</template>