<script setup>

const categoryID = ref();
const newCategoryName = ref();
const editCategoryName = ref();
const profileStore = useProfileStore();
const categoryStore = useCategoryStore();
const businessID = computed(() => {
    return profileStore.currentBusiness ? profileStore.currentBusiness.id : 'Create Business';
});
const transformedCategories = ref([]);
const categories = ref([]);
// Test Section
onMounted(async () => {
    categories.value = await categoryStore.getCategories(businessID.value);
    transformedCategories.value = categories.value.map(category => {
        return { label: category.name, value: category.id };
    });
    console.log(categories.value)
});

// const transformedCategories = computed(() => {
//     if (process.client) {
//         return categories.value.map(category => {
//             console.log(category)
//             // return { label: category.name, value: category.id };
//         });
//     }

// });

const newCategory = async () => {
    const response = await categoryStore.addCategory(businessID.value, newCategoryName.value);
}
</script>

<template>
    <div class="flex flex-col space-y-4">
        <UFormGroup label="New Category">
            <UInput v-model="newCategoryName" />
            <UButton @click="newCategory()">Add Category</UButton>
        </UFormGroup>
        <UFormGroup label="Edit Category">
            <USelect v-model="categoryID" :options="transformedCategories"></USelect>
            <UInput v-model="editCategoryName" />
            <UButton @click="editCategory()">Edit Category</UButton>
        </UFormGroup>
    </div>
</template>