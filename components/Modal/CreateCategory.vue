<script setup>
import { ref } from "vue";

const toast = useToast();
const props = defineProps({
    isOpen: Boolean,
});

const emits = defineEmits(["update:isOpen"]);

const closeModal = () => {
    emits("update:isOpen", false);
};

const user = useSupabaseUser();
const userID = user.value.id;

const state = reactive({
    name: undefined,
    owner_id: userID,
});

const response = ref(null);

const validate = (state) => {
    const errors = [];
    if (!state.name) errors.push({ path: "name", message: "Required" });
    if (!state.duration) errors.push({ path: "duration", message: "Required" });
    if (!state.price) errors.push({ path: "price", message: "Required" });
    return errors;
};

async function onSubmit(event) {
    const { data, error } = await useFetch("/api/services/create", {
        method: "POST",
        body: state,
    });
    closeModal();
    toast.add({ title: "Category Created Successfully" });
}
</script>
<template>
    <UModal v-model="props.isOpen" prevent-close>
        <UCard :ui="{
            ring: '',
            divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }">
            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        New Category
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                        @click="closeModal" />
                </div>
            </template>

            <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
                <UFormGroup label="Category Name" name="name">
                    <UInput v-model="state.name" placeholder="Hair Cut" />
                </UFormGroup>
                <!-- <UFormGroup label="Category" name="category">
                    <USelect v-model="category" :options="categories" option-attribute="category" />
                </UFormGroup> -->
                <!-- <UFormGroup label="Specialist" name="specialist">
                    <USelect v-model="specialist" :options="specialists" option-attribute="specialist" />
                </UFormGroup> -->


                <UButton type="submit"> Create </UButton>
            </UForm>
        </UCard>
    </UModal>
</template>
