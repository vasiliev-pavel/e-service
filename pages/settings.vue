<script setup>
const profileStore = useProfileStore();
</script>

<template>
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
