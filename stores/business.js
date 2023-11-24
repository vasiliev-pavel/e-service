import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useBusinessStore = defineStore("business", () => {
  const businesses = ref([]);
  const selectedSalonId = ref(null);
  const categories = ref([]);

  // Функция для обновления данных business
  const setBusiness = (newData) => {
    businesses.value = newData;
    // и хранеия их в store в случае если мы на стороне клиента
    if (process.client) {
      localStorage.setItem("businesses", JSON.stringify(newData));
    }
  };

  const setCategories = (newData) => {
    categories.value = newData;
    // и хранеия их в store в случае если мы на стороне клиента
    if (process.client) {
      localStorage.setItem("categories", JSON.stringify(newData));
    }
  };

  const fetchCategoriesAndServices = async (salonId) => {
    // Получение названий категорий
    const { data: categoriesNamesData } = await useFetch(`/api/categories`);
    const categoriesNames = new Map(
      categoriesNamesData.value.data.map((c) => [c.id, c.name])
    );

    // Получение списка категорий с их ID
    const { data: categoriesData } = await useFetch(
      `/api/business_categories/${salonId}`
    );
    categories.value = categoriesData.value.data.map((category) => ({
      category_id: category.category_id,
      category_name: categoriesNames.get(category.category_id),
      services: [],
    }));

    // Получение всех услуг для salonId
    const { data: allServices } = await useFetch(`/api/services/${salonId}`);

    // Фильтрация услуг по каждой категории и исключение лишних данных
    for (const category of categories.value) {
      category.services = allServices.value.data
        .filter((service) => service.category_id === category.category_id)
        .map((service) => ({
          id: service.id,
          name: service.name,
          duration: service.duration,
          price: service.price,
        }));
    }
  };

  //следим за выбранным пользователем салоном
  //и если он выбрал новый, то обновляем данные
  watch(selectedSalonId, async (newId, oldId) => {
    if (newId && newId !== oldId) {
      await fetchCategoriesAndServices(newId);
    }
    setCategories(categories.value);
  });

  return {
    businesses,
    selectedSalonId,
    categories,
    setBusiness,
    setCategories,
  };
});
