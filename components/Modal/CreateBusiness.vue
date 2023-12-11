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
  return errors;
};

async function onSubmit(event) {
  const { data, error } = await useFetch("/api/businesses/create", {
    method: "POST",
    body: state,
  });
  closeModal();
  toast.add({ title: "Business Created Successfully" });
}
</script>
<template>
  <UModal v-model="props.isOpen" prevent-close>
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            New Business
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="closeModal"
          />
        </div>
      </template>

      <UForm
        :validate="validate"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormGroup label="Business Name" name="name">
          <UInput v-model="state.name" />
        </UFormGroup>

        <UButton type="submit"> Create </UButton>
      </UForm>
    </UCard>
  </UModal>
</template>
