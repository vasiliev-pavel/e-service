<!-- services.vue -->
<template>
  <div>
    <CollapsibleChecklist :categories="categories" @toggle="toggleCategory" />
    <SelectedService :selectedServices="selectedServices" />
  </div>
</template>

<script>
export default {
  computed: {
    selectedServices() {
      return this.categories
        .flatMap((category) => category.services)
        .filter((service) => service.checked);
    },
  },
  methods: {
    toggleCategory(index) {
      this.categories[index].isOpen = !this.categories[index].isOpen;
    },
  },

  // нужно будет добавить получение данных из бд по идентификатору магазина
  data() {
    return {
      categories: [
        {
          name: "Маникюр",
          isOpen: false,
          services: [
            {
              id: 1,
              name: "Маникюр 1 (комби/аппарат)",
              price: 800,
              checked: false,
            },
            {
              id: 2,
              name: "Маникюр 2 (комби/аппарат)",
              price: 1800,
              checked: false,
            },
            // ... more services
          ],
        },
        {
          name: "Педикюр",
          isOpen: false,
          services: [
            {
              id: 21,
              name: "Педикюр (комби/аппарат)",
              price: 800,
              checked: false,
            },
          ],
        },
        // ... more categories
      ],
    };
  },
};
</script>

<style scoped>
/* Add styles here */
</style>
