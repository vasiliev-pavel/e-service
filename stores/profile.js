import { defineStore } from "pinia";
import { ref } from "vue";

export const useProfileStore = defineStore("profile", () => {
    const myBusinesses = ref([]);
    const myProfile = ref(null);

    const fetchMyProfile = async (userId) => {
        try {
            const response = await fetch(`/api/profile`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: userId })
            });

            if (!response.ok) {
                throw new Error('Error fetching profile');
            }

            const { data } = await response.json();
            myProfile.value = data;
        } catch (error) {
            console.error("Error fetching profile:", error.message);
        }
    };

    const fetchMyBusinesses = async (userId) => {
        try {
            const response = await fetch(`/api/businesses`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ owner_id: userId })
            });

            if (!response.ok) {
                throw new Error('Error fetching businesses');
            }

            const { data } = await response.json();
            myBusinesses.value = data;
        } catch (error) {
            console.error("Error fetching businesses:", error.message);
        }
    };

    return {
        myBusinesses,
        myProfile,
        fetchMyProfile,
        fetchMyBusinesses,
    };
});
