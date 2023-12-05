<script setup>
import { ref } from 'vue';

const { data } = await useFetch('/api/appointments')
const appointments = data?.value?.data;


const isModalOpen = ref(false);
const newTime = ref('');

// Реактивная ссылка для хранения данных текущей записи
const currentAppointment = ref(null);
// Добавление состояния для типа действия модального окна
const modalActionType = ref('confirm'); // 'confirm', 'cancel', 'changeTime'

// Функция для открытия модального окна подтверждения с данными текущей записи
const openModal = (appointment, actionType) => {
    currentAppointment.value = appointment;
    modalActionType.value = actionType;
    isModalOpen.value = true;
};

const availability = ['Later Today', 'Tomorrow', 'Next Week']

const selected = ref([])

const updateStatus = async (appointmentId, newStatus, newTime = null) => {
    // Тут будет ваш запрос к серверу для обновления статуса
    // Например, вы можете использовать fetch API или axios для отправки запроса
};
</script>
<template>
    <UBadge class="my-4" color="primary" variant="subtle" size="lg">Appointments</UBadge>
    <div class="flex flex-col">
        <UCard class="my-6 text-white" v-for="appointment in appointments" :key="appointment?.id">
            <template #header>
                {{ new Date(appointment.date_time).toLocaleString() }}
            </template>

            <p><strong>Customer:</strong> {{ appointment.customer_name }}</p>
            <p><strong>Specialist:</strong> {{ appointment.specialist_name }}</p>
            <p><strong>Service:</strong> {{ appointment.service_name }}</p>

            <template #footer>
                <UButton class="mr-4" @click="openModal(appointment, 'confirm')">Confirm</UButton>
                <UButton class="mx-4" @click="openModal(appointment, 'changeTime')">Change Time</UButton>
                <UButton class="ml-4" @click="openModal(appointment, 'cancel')">Cancel</UButton>
            </template>
        </UCard>
    </div>
    <!-- Modal -->
    <UModal v-model="isModalOpen">
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        Appointment Confirmation
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                        @click="isModalOpen = false" />
                </div>
            </template>

            <div class="flex flex-col">
                <UBadge class="mt-4" color="primary" variant="subtle" size="lg">
                    Are you sure you want to confirm this appointment?
                </UBadge>

                <UBadge class="mt-4" color="primary" variant="subtle" size="lg">
                    Time: {{ new Date(currentAppointment.date_time).toLocaleString() }}
                </UBadge>
                <UBadge class="mt-4" color="primary" variant="subtle" size="lg">
                    Service: {{ currentAppointment.service_name }}
                </UBadge>
                <UBadge class="mt-4" color="primary" variant="subtle" size="lg">
                    Specialist: {{ currentAppointment.specialist_name }}
                </UBadge>
                <UBadge class="mt-4" color="primary" variant="subtle" size="lg">
                    Customer: {{ currentAppointment.customer_name }}
                </UBadge>
                <USelectMenu class="mt-4" size="lg" v-model="selected" :options="availability" multiple
                    placeholder="Select Time" v-if="modalActionType === 'changeTime'" />
            </div>

            <template #footer>
                <UButton class="mr-4" @click="updateStatus(currentAppointment.id, 'confirmed', null)">Confirm</UButton>
                <UButton class="ml-4" @click="isModalOpen = false">Cancel</UButton>
            </template>
        </UCard>
    </UModal>
</template>