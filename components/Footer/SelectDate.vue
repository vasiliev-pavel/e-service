<template>
    <div class="flex items-center">
        <UButton @click="goToPreviousWeek">
            <i class="i-heroicons-arrow-long-left-20-solid"></i>
        </UButton>

        <UButton v-for="(day, index) in weekDays" :key="index" @click="selectDay(day)">
            {{ formatDay(day) }}
        </UButton>

        <UButton @click="goToNextWeek">
            <i class="i-heroicons-arrow-long-right-20-solid"></i>
        </UButton>
    </div>
</template>

    
<script setup>
const profileStore = useProfileStore();
const currentDate = ref(new Date());

const startOfWeek = computed(() => {
    const date = new Date(currentDate.value);
    date.setDate(date.getDate() - date.getDay() + 1);
    return date;
});

const weekDays = computed(() => {
    const days = [];
    for (let i = 0; i < 7; i++) {
        const day = new Date(startOfWeek.value);
        day.setDate(day.getDate() + i);
        days.push(day);
    }
    return days;
});

const goToPreviousWeek = () => {
    const newDate = new Date(currentDate.value);
    newDate.setDate(newDate.getDate() - 7);
    currentDate.value = newDate;
};

const goToNextWeek = () => {
    const newDate = new Date(currentDate.value);
    newDate.setDate(newDate.getDate() + 7);
    currentDate.value = newDate;
};


const selectDay = (day) => {
    profileStore.setCurrentDate(day);
};

const formatDay = (day) => {
    return day.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' });
};
</script>