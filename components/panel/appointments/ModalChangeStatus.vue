<template>
    <!-- Модальное окно для подтверждения -->
    <UModal v-model="confirmModalVisible">
        <div class="p-4">
            <p>Are you sure you want to confirm this appointment?</p>
            <UButton @click="confirmAppointment(selectedAppointment.id)">Confirm</UButton>
            <UButton @click="closeConfirmModal">Cancel</UButton>
        </div>
    </UModal>

    <!-- Модальное окно для изменения времени -->
    <UModal v-model="changeTimeModalVisible">
        <div class="p-4">
            <p>Select a new time for the appointment:</p>
            <!-- Здесь будет ваш компонент для выбора времени -->
            <UButton @click="changeAppointmentTime(selectedAppointment.id, newTime)">Change Time</UButton>
            <UButton @click="closeChangeTimeModal">Cancel</UButton>
        </div>
    </UModal>
</template>
  
<script setup>
import { ref } from 'vue';

const confirmModalVisible = ref(false);
const changeTimeModalVisible = ref(false);
const selectedAppointment = ref(null);
const newTime = ref(''); // Состояние для хранения нового времени

const openConfirmModal = (appointment) => {
    selectedAppointment.value = appointment;
    confirmModalVisible.value = true;
};

const closeConfirmModal = () => {
    confirmModalVisible.value = false;
};

const openChangeTimeModal = (appointment) => {
    selectedAppointment.value = appointment;
    changeTimeModalVisible.value = true;
};

const closeChangeTimeModal = () => {
    changeTimeModalVisible.value = false;
};

const confirmAppointment = async (appointmentId) => {
    // Вызов API для подтверждения записи
    closeConfirmModal();
};

const changeAppointmentTime = async (appointmentId, newTime) => {
    // Вызов API для изменения времени записи
    closeChangeTimeModal();
};

// Вы можете добавить функцию cancelAppointment здесь, аналогично предыдущим
</script>
  