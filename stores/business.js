import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useBusinessStore = defineStore("business", () => {
  const businesses = ref([]);
  const selectedSalonId = ref(null);
  const categories = ref([]);
  const specialists = ref([]);

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

  // Получение cпециалистов и услуги которые они выполняют
  const fetchSpecialistsAndServices = async (salonId) => {
    const { data: specialistsData } = await useFetch(
      `/api/specialists/${salonId}`
    );

    specialists.value = specialistsData.value.data;

    const { data: servicesData } = await useFetch(
      `/api/specialist_services/${salonId}`
    );

    for (const specialist of specialists.value) {
      specialist.services = servicesData.value.data
        .filter((service) => service.specialist_id === specialist.id)
        .map((service) => service.service_id);
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
      category.services = allServices.value.data.filter(
        (service) => service.category_id === category.category_id
      );
    }
  };

  //следим за выбранным пользователем салоном
  //и если он выбрал новый, то обновляем данные
  watch(selectedSalonId, async (newId, oldId) => {
    if (newId && newId !== oldId) {
      // Параллельная загрузка данных
      await Promise.all([
        fetchCategoriesAndServices(newId),
        fetchSpecialistsAndServices(newId),
      ]);
      // await fetchCategoriesAndServices(newId);
      // await fetchSpecialistsAndServices(newId);
    }
    setCategories(categories.value);
  });

  return {
    businesses,
    selectedSalonId,
    categories,
    specialists,
    setBusiness,
    setCategories,
  };
});
