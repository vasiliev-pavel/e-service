import { defineStore } from "pinia";

export const useCategoryStore = defineStore(
  "category",
  () => {
    const categories = ref([]); 
    const toast = useToast();

    const getCategories = async (business_id) => {
      if (!business_id)
        return "No Business ID";
      try {
          const {data:response} = await useFetch(`/api/categories?business_id=${business_id}`);
          setCategories(response.value);
          return response.value;
      } catch (error) {
        toast.add({ title: error.message })
        return error;
      }
    }

    const setCategories = (newCategories) => {
      categories.value = newCategories;
    };

    const addCategory = async(business_id, name) => {
      if (!business_id)
        return "No Business ID";
        try {
          const response = await $fetch(`/api/categories`,
          {
            method: "POST",
            body: {
              name: name,
              business_id: business_id
            }
          });
          if (response.data == null)
            toast.add({ title: "Category added Successfully" })  
          return response;
      } catch (error) {
        toast.add({ title: error.message })
        return error;
      }
    }


    return {
        categories,
        getCategories,
        setCategories,
        addCategory
      };
    },
    { persist: true }
);