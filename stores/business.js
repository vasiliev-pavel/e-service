import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useBusinessStore = defineStore("business", () => {
  const businesses = ref([]);
  const selectedSalonId = ref(null);
  const categories = ref([]);
  const specialists = ref([]);
  const availabilitySpecialist = ref([]);

  //обновлённая структура
  const selectedBusiness = ref({});

  // Функция для обновления данных business
  const setBusiness = (newData) => {
    businesses.value = newData;
    // и хранеия их в store в случае если мы на стороне клиента
    // if (process.client) {
    //   localStorage.setItem("businesses", JSON.stringify(newData));
    // }
  };

  const setCategories = (newData) => {
    categories.value = newData;
    // и хранеия их в store в случае если мы на стороне клиента
    // if (process.client) {
    //   localStorage.setItem("categories", JSON.stringify(newData));
    // }
  };

  const fetchAllData = async (salonId) => {
    const { data: businessData } = await useFetch(`/api/businesses/${salonId}`);
    selectedBusiness.value = businessData.value.data;
    // console.log(businessData);
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
    // Получение списка категорий
    const { data: categoriesData } = await useFetch(
      `/api/categories/${salonId}`
    );

    categories.value = categoriesData.value.data.map((category) => ({
      category_id: category.id,
      category_name: category.name,
      services: [],
    }));

    // Получение всех услуг для salonId
    const { data: allServices } = await useFetch(`/api/services/${salonId}`);

    // Фильтрация услуг по каждой категории и исключение лишних данных
    for (const category of categories.value) {
      category.services = allServices.value.data
        .filter((service) => service.category_id === category.category_id)
        .map(
          ({ category_id, ...serviceWithoutCategoryId }) =>
            serviceWithoutCategoryId
        );
    }
  };

  const fetchAvailability = async (salonId) => {
    const { data: availability } = await useFetch(
      `/api/availability/${salonId}`
    );

    if (availability && availability.value) {
      availabilitySpecialist.value = availability.value.data;
    }
  };

  //следим за выбранным пользователем салоном
  //и если он выбрал новый, то обновляем данные
  watch(selectedSalonId, async (newId, oldId) => {
    if (newId && newId !== oldId) {
      await fetchAllData(newId);
      // Параллельная загрузка данных
      //   await Promise.all([
      //     fetchCategoriesAndServices(newId),
      //     fetchSpecialistsAndServices(newId),
      //     fetchAvailability(newId),
      //   ]);
      //   await fetchCategoriesAndServices(newId);
      //   await fetchSpecialistsAndServices(newId);
    }
    setCategories(categories.value);
  });

  return {
    businesses,
    selectedBusiness,
    selectedSalonId,
    // categories,
    // specialists,
    availabilitySpecialist,
    setBusiness,
    setCategories,
  };
});
