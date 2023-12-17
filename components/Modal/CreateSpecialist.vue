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
const profileStore = useProfileStore();
const userID = user.value.id;

const state = reactive({
    full_name: undefined,
    business_id: profileStore.currentBusiness.id,
    role: 'specialist'
});

const response = ref(null);

const validate = (state) => {
    const errors = [];
    if (!state.full_name) errors.push({ path: "full_name", message: "Required" });
    return errors;
};

async function onSubmit(event) {
    const { data, error } = await useFetch("/api/specialists/create", {
        method: "POST",
        body: state,
    });
    closeModal();
    toast.add({ title: "Specialist Added Successfully" });
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
                        New Specialist
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                        @click="closeModal" />
                </div>
            </template>

            <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
                <UFormGroup label="Full Name" name="full_name">
                    <UInput v-model="state.full_name" placeholder="Alex Lindman" />
                </UFormGroup>
                <UButton type="submit"> Create </UButton>
            </UForm>
        </UCard>
    </UModal>
</template>
