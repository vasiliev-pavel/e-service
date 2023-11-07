<template>
  <div class="bg-transparent rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
    <div class="-mx-3 md:flex mb-6">
      <div class="md:w-full px-3">
        <h2 class="text-gray-200 text-lg mb-3">Специалисты</h2>
        <div class="flex flex-col">
          <!-- Provider 1 -->
          <div class="flex items-center mb-4 bg-slate-300 rounded-lg p-3">
            <div class="w-10 h-10 mr-3">
              <img
                class="rounded-full"
                src="~/assets/img/cat.jpg"
                alt="Алина"
              />
            </div>
            <div class="flex flex-col">
              <span class="font-semibold text-gray-900">Топ Мастер Алина</span>
              <span class="text-gray-600 text-sm">Специалист</span>
            </div>
          </div>
          <!-- Provider 2 -->
          <div class="flex items-center mb-4 bg-slate-300 rounded-lg p-3">
            <div class="w-10 h-10 mr-3">
              <img
                class="rounded-full"
                src="~/assets/img/cat.jpg"
                alt="Эльвина"
              />
            </div>
            <div class="flex flex-col">
              <span class="font-semibold text-gray-900">Мастер Эльвина</span>
              <span class="text-gray-600 text-sm">Мастер</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Your styles can also go here. But with Tailwind, most styling is done via utility classes. */
</style>

<script>
export default {
  data() {
    return {
      specialists: [
        {
          name: "Топ Мастер Алина",
          type: "Master",
          image: "path to image",
          categories: [
            {
              name: "Маникюр",
              isOpen: false,
              services: [
                1, 2, 21,
                // ... more services
              ],
            },
            {
              name: "Педикюр",
              isOpen: false,
              services: [{ name: "Педикюр (комби/аппарат)" }],
            },
            // ... more categories
          ],
          appointments: {},
        },
        {
          name: "Мастер Эльвина",
          type: "Specialist",
          image: "path to image",
          categories: [
            {
              name: "Укладка",
              isOpen: false,
              services: [
                21,
                // ... more services
              ],
            },
            {
              name: "Педикюр",
              isOpen: false,
              services: [{ name: "Педикюр (комби/аппарат)" }],
            },
            // ... more categories
          ],
          appointments: {},
        },
      ],
    };
  },
};
</script>
