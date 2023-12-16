<script setup>
const toggleModal = () => {
    isOpen.value = !isOpen.value;
};

const isOpen = ref(false);
const user = useSupabaseUser();
const userID = user.value.id;
const profileStore = useProfileStore();


const services = ref([]);

const { data } = await useFetch('/api/services/get_services_by_owner_json', {
    method: 'POST',
    body: { owner_id: userID }
});

services.value = data?.value?.data;


</script>
<template>
    <!-- Нужно доставать сервисы по компаниям, от выбранной компании -->
    <div class="flex flex-col">
        <UBadge class="my-4" color="primary" variant="subtle" size="lg">Services</UBadge>
        <UButton class="my-2" size="lg" @click="toggleModal">Create</UButton>
        <UCard class="my-6 text-white" v-for="service in services" :key="service.id">
            <p><strong>Name:</strong> {{ service.name }}</p>
            <p><strong>Price:</strong> {{ service.price }}</p>
            <p><strong>Duration:</strong> {{ service.duration }}</p>
            <p><strong>Category:</strong> {{ service.category }}</p>
            <p><strong>Specialist:</strong> {{ service.specialist }}</p>
            <UButton color="red" @click="deleteService(service.id)">Delete</UButton>
        </UCard>
    </div>
    <ModalCreateService :is-open="isOpen" @update:isOpen="isOpen = $event" />
</template>