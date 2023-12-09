<script setup>
const user = useSupabaseUser();
const userID = user.value.id;

const businesses = ref([]);

const { data } = await useFetch('/api/businesses', {
    method: 'POST',
    body: { owner_id: userID }
});

businesses.value = data?.value?.data;

const deleteBusiness = async (businessId) => {
    await useFetch('/api/businesses/remove', {
        method: 'POST',
        body: { id: businessId, owner_id: userID }
    });

    // Reload businesses or update the list locally
    businesses.value = businesses.value.filter(b => b.id !== businessId);
};

</script>
<template>
    <div class="flex flex-col">
        <UBadge class="my-4" color="primary" variant="subtle" size="lg">Business</UBadge>
        <UButton class="my-2" size="lg" to="/panel/business/create">Create</UButton>
        <UCard class="my-6 text-white" v-for="business in businesses" :key="business.id">
            <p><strong>Name:</strong> {{ business.name }}</p>
            <UButton color="red" @click="deleteBusiness(business.id)">Delete</UButton>
        </UCard>
    </div>
</template>