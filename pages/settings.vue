<script setup>
const loaderStore = useLoaderStore();
const toast = useToast();
const profileStore = useProfileStore();
const user = useSupabaseUser();
const userID = user.value.id;

const state = reactive({
    full_name: profileStore.myProfile.full_name,
    id: userID
});

const validate = (state) => {
    const errors = [];
    if (!state.full_name) errors.push({ path: "full_name", message: "Required" });
    return errors;
};

async function onSubmit(event) {
    loaderStore.show();
    const { data } = await useFetch("/api/profile/edit", {
        method: "POST",
        body: state,
    });

    loaderStore.hide();
    toast.add({ title: "Changes Saved Successfully", type: 'success' });
    // Теперь обновляем данные профиля в нашем сторе.
    const profile = await profileStore.fetchMyProfile(userID);
    if (profile.role === 'owner') {
        await profileStore.fetchMyBusinesses(userID);
    }
    if (profile.role === 'specialist') {
        await profileStore.fetchMyBusinesses(userID);
    }
    // if (profile.role === 'customer') {
    // }

}
</script>

<template>
    <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Full Name" name="full_name">
            <UInput v-model="state.full_name" />
        </UFormGroup>
        <UButton type="submit">Save</UButton>
    </UForm>
    <div>
        <h2>User Profile</h2>
        <div v-if="profileStore.myProfile">
            <!-- Display user profile information -->
            <p><strong>Name:</strong> {{ profileStore.myProfile.full_name }}</p>
            <p><strong>Role:</strong> {{ profileStore.myProfile.role }}</p>
        </div>

        <h2>My Businesses</h2>
        <ul v-if="profileStore.myBusinesses.length">
            <!-- Loop through businesses and display information -->
            <li v-for="business in profileStore.myBusinesses" :key="business.id">
                <p><strong>Business Name:</strong> {{ business.name }}</p>
                <!-- Add more fields as needed -->
            </li>
        </ul>
    </div>
</template>
