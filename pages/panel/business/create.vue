<template>
    <div class="flex flex-col">
        <UBadge class="my-4" color="primary" variant="subtle" size="lg">Create Business</UBadge>
        <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
            <UFormGroup label="Name" name="name">
                <UInput v-model="state.name" />
            </UFormGroup>

            <UButton type="submit">
                Create
            </UButton>
        </UForm>
    </div>
</template>

<script setup>

const user = useSupabaseUser();
const userID = user.value.id;

const state = reactive({
    name: undefined,
    owner_id: userID
})

const response = ref(null);

const validate = (state) => {
    const errors = []
    if (!state.name) errors.push({ path: 'name', message: 'Required' })
    return errors
}

async function onSubmit(event) {
    const { data, error } = await useFetch('/api/businesses/create', {
        method: 'POST',
        body: state
    });
    await navigateTo('/panel/business')

}
</script>