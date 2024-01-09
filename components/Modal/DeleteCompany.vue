<script setup>
const toast = useToast();
const profileStore = useProfileStore();

const businessName = computed(() => {
    return profileStore.currentBusiness ? profileStore.currentBusiness.name : 'Create Business';
})

const isOpen = ref(false);
const toggleModal = () => {
    console.log(isOpen);
    isOpen.value = !isOpen.value;
};


const user = useSupabaseUser();
const userID = user.value.id;

const state = computed(() => ({
    id: profileStore.currentBusiness.id,
    owner_id: userID,
}));

// при удалении могут быть связи, нужно спрашивать пользователя об удалениии всех сервисов, сотрудников и других связанных полей

async function onSubmit() {
    const { data, error } = await useFetch("/api/businesses", {
        method: "DELETE",
        body: state,
    });
    profileStore.deleteBusiness(state.id);
    toast.add({ title: "Business Deleted Successfully" });
    toggleModal();
}
</script>
<template>
    <UButton @click="toggleModal()" class="ml-6" color="red">
        Delete Company
    </UButton>
    <UModal v-model="isOpen">
        <UCard :ui="{
            ring: '',
            divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }">
            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        Delete Business
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                        @click="toggleModal" />
                </div>
            </template>

            <UForm :state="state" class="space-y-4">
                <UFormGroup class="text-9xl" :label="`Are you sure about deleting ${businessName}?`" />

                <UButton @click="onSubmit()" color="red"> Delete </UButton>
                <UButton class="ml-4" @click="toggleModal()"> Cancel </UButton>
            </UForm>
        </UCard>
    </UModal>
</template>
