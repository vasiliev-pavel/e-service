import { defineStore } from "pinia";
import { ref, watch } from "vue";
import {callAPI} from "~/utils/apiRequest"

export const useCategoryStore = defineStore(
  "category",
  () => {
    const categories = ref<any[]>([]); 
    const error = ref<unknown>(null);


    const getCategories = async (business_id: string) => {
        try {
            const response = await useFetch(`/api/categories`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ business_id })
            });

            if (Array.isArray(response.data.value)) {
                categories.value = response.data.value;
            } else {
                categories.value = [];
            }
            
            console.log(categories.value);
        } catch (e) {
            if (e instanceof Error) {
                error.value = e.message;
            } else {
                error.value = 'An unknown error occurred';
            }
            console.error(e);
        }
    }

    return {
        categories,
        getCategories
      };
    },
    { persist: true }
);