<script setup>

const router = useRouter()
const isOpenCreate = ref(false);
const profileStore = useProfileStore();
const props = defineProps({
    isOpenSelect: Boolean,
});

const emits = defineEmits(["update:isOpenSelect"]);

const selectBusiness = (business) => {
    profileStore.setCurrentBusiness(business.id);
    emits("update:isOpenSelect", false);
};

const myBusinesses = computed(() => {
    return profileStore.myBusinesses;
})

const closeModal = () => {
    emits("update:isOpenSelect", false);
};

const goTo = () => {
    closeModal();
    router.push({ path: "/panel/companies" })
}

const toggleModalCreate = () => {
    closeModal();
    console.log(myBusinesses);
    isOpenCreate.value = !isOpenCreate.value;
};
</script>

<template>
    <UModal v-model="props.isOpenSelect" prevent-close>
        <UCard :ui="{
            ring: '',
            divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }">
            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        Select Business
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                        @click="closeModal" />
                </div>
            </template>
            <template #default>
                <ul class="flex flex-col business_list snap-y">
                    <li class="flex items-center  cursor-pointer text-white flex p-4 hover:bg-black-300"
                        @click="toggleModalCreate()">
                        <i class="i-heroicons-plus-20-solid mr-2"></i> Create Business
                    </li>
                    <li class="flex items-center cursor-pointer text-white flex p-4 hover:bg-black-300" @click="goTo()">
                        <i class="i-heroicons-building-storefront-20-solid mr-2"></i>All Businesses
                    </li>
                    <li class="flex items-center cursor-pointer text-white flex p-4 hover:bg-black-300"
                        v-for="business in myBusinesses" :key="business.id" @click="selectBusiness(business)">
                        <i class="i-heroicons-map-pin-20-solid mr-2"></i> {{ business.name }}
                    </li>
                </ul>
            </template>
        </UCard>
    </UModal>
    <ModalCreateBusiness :is-open-create="isOpenCreate" @update:isOpenCreate="isOpenCreate = $event" />
</template>

<style scoped>
.business_list li,
.business_list a {
    transition: 0.3s all;
    border-bottom: 1px solid #646464;
}

.business_list li:hover,
.business_list a:hover {
    background-color: #4c4c4c;
}
</style>