<script setup>
const profileStore = useProfileStore();
const forms = [
    {
        slot: 'general',
        label: 'General',
        icon: 'i-heroicons-information-circle',
    },
    {
        slot: 'photos',
        label: 'Photos',
        icon: 'i-heroicons-information-circle',
    },
    {
        slot: 'details',
        label: 'Details',
        icon: 'i-heroicons-information-circle',
    },
]

const generalForm = reactive({
    get name() {
        return profileStore.currentBusiness ? profileStore.currentBusiness.name : '';
    },
    set name(value) {
    }
});
const photosForm = reactive({ photos: 'file' })
const detailsForm = reactive({ details: 'details' });


function onSubmitGeneral() {
    console.log('Submitted form:', generalForm)
}

function onSubmitPhotos() {
    console.log('Submitted form:', photosForm)
}

function onSubmitDetails() {
    console.log('Submitted form:', detailsForm)
}

</script>
<template>
    <div class="flex flex-row w-full">
        <UTabs :items="forms" class="w-full">
            <template #general="{ item }">
                <UCard @submit.prevent="onSubmitGeneral">
                    <template #header>
                        <p class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                            {{ item.label }}
                        </p>
                        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Make changes to your company here. Click save when you're done.
                        </p>
                    </template>

                    <UFormGroup label="Name" name="name" class="mb-3">
                        <UInput v-model="generalForm.name" />
                    </UFormGroup>

                    <template #footer>
                        <UButton type="submit" color="black">
                            Save General
                        </UButton>
                        <ModalDeleteCompany />
                    </template>
                </UCard>
            </template>


            <template #photos="{ item }">
                <UCard @submit.prevent="onSubmitPhotos">
                    <template #header>
                        <p class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                            {{ item.label }}
                        </p>
                        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Add photos here. Click save when you're done.
                        </p>
                    </template>

                    <UFormGroup label="Photos" name="photos" class="mb-3">
                        <input type="file" />
                    </UFormGroup>

                    <template #footer>
                        <UButton type="submit" color="black">
                            Save Photos
                        </UButton>
                    </template>
                </UCard>
            </template>

            <template #details="{ item }">
                <UCard @submit.prevent="onSubmitDetails">
                    <template #header>
                        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                            {{ item.label }}
                        </h3>
                        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Make changes to your company deatils here. Click save when you're done.
                        </p>
                    </template>

                    <UFormGroup label="Details" name="details" class="mb-3">
                        <UInput v-model="detailsForm.details" />
                    </UFormGroup>

                    <template #footer>
                        <UButton type="submit" color="black">
                            Save Details
                        </UButton>
                    </template>
                </UCard>
            </template>


        </UTabs>
    </div>
</template>