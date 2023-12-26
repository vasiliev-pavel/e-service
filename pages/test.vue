<script setup>

const categoryStore = useCategoryStore();
const getCat = async () => {
    const categories = await categoryStore.getCategories("2fa4811a-ef5b-4163-9a13-4a3d8c10ccca");
};
</script>

<template>
    <UButton @click="getCat()">Query</UButton>
</template>