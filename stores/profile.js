import { defineStore } from "pinia";
import { ref } from "vue";

export const useProfileStore = defineStore(
  "profile",
  () => {
    const myBusinesses = ref([]);
    const myProfile = ref(null);
    const currentBusiness = ref(null);
    const currentDate = ref(null);

    const setCurrentDate = (date) => {
      currentDate.value = date;
    };

    const setCurrentBusiness = (businessId) => {
      const business = myBusinesses.value.find((b) => b.id === businessId);
      if (business) {
        currentBusiness.value = business;
      } else {
        console.error("Business not found.:", businessId);
      }
    };

    const addBusiness = (newBusiness) => {
      myBusinesses.value.push(newBusiness);
    };

    const fetchMyProfile = async (userId) => {
      try {
        const response = await fetch(`/api/profile`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: userId }),
        });

        if (!response.ok) {
          throw new Error("Error fetching profile");
        }

        const { data } = await response.json();
        myProfile.value = data;
        return data;
      } catch (error) {
        console.error("Error fetching profile:", error.message);
      }
    };

    const fetchMyBusinesses = async (userId) => {
      try {
        const response = await fetch(`/api/businesses`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ owner_id: userId }),
        });

        if (!response.ok) {
          throw new Error("Error fetching businesses");
        }

        const { data } = await response.json();
        myBusinesses.value = data;
        if (data.length > 0) {
          setCurrentBusiness(data[0].id);
        }
      } catch (error) {
        console.error("Error fetching businesses:", error.message);
      }
    };

    const resetProfile = () => {
      myBusinesses.value = [];
      myProfile.value = null;
      currentBusiness.value = null;
    };

    return {
      myBusinesses,
      myProfile,
      currentBusiness,
      setCurrentBusiness,
      setCurrentDate,
      addBusiness,
      fetchMyProfile,
      fetchMyBusinesses,
      resetProfile,
    };
  },
  { persist: true }
);
