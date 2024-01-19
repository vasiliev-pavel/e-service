<!-- //TimeSlot.vue -->

<template>
  <div class="flex flex-col items-center justify-center text-gray-300">
    <!-- {{ loaderStore.hide }} -->
    <div v-for="period in filteredPeriods" :key="period.label" class="mb-4">
      <div class="font-bold mb-2">{{ period.label }}</div>
      <div class="grid grid-cols-4 gap-2">
        <button
          v-for="time in period.times"
          :key="time"
          @click="selectTime(time)"
          class="py-2 px-4 border rounded text-center cursor-pointer hover:bg-gray-200 hover:text-gray-600"
        >
          {{ time.time }}
        </button>
      </div>
    </div>
  </div>
  <UnavailableDateAlert
    v-if="!hasAvailableSlots"
    :selectedDay="props.selectedDate"
  />
</template>

<script setup>
import { ref, computed, watch } from "vue";
import UnavailableDateAlert from "~/components/user/appointment/UnavailableDateAlert.vue";

import moment from "moment";
import { durationToMinutes } from "~/utils/appointmentUtils";
const businessStore = useBusinessStore();
const userStore = useUserStore();
const router = useRouter();

const availability = ref(userStore.selectedSpecialist?.availability || {});
const categoriesById = businessStore.selectedBusiness.categoriesById || {};

const props = defineProps({
  selectedDate: String, // Добавляем prop для выбранной даты
});

// const hasSlotsAvailable = ref(false);
const hasAvailableSlots = computed(() => {
  return filteredPeriods.value.some((period) => period.times.length > 0);
});
// вычисление общей длительности выбранных услуг
const getTotalDuration = () => {
  return Object.values(userStore.selectedServices).reduce((total, service) => {
    return total + durationToMinutes(service.duration);
  }, 0);
};

// Функция для генерации слотов времени
const generateTimeSlots = (startTime, endTime) => {
  const slots = [];
  let currentTime = moment(props.selectedDate).set({
    hour: moment(startTime, "HH:mm").hour(),
    minute: moment(startTime, "HH:mm").minute(),
  });
  const endMoment = moment(props.selectedDate).set({
    hour: moment(endTime, "HH:mm").hour(),
    minute: moment(endTime, "HH:mm").minute(),
  });

  while (currentTime.isBefore(endMoment)) {
    slots.push(currentTime.format("HH:mm"));
    currentTime.add(15, "minutes");
  }

  return slots;
};

// Вычисляемое свойство для определения рабочих часов специалиста в выбранный день
const workingHours = computed(() => {
  const dayOfWeek = moment(props.selectedDate).format("dddd").toLowerCase();
  // Используйте опциональную цепочку для безопасного доступа к свойствам
  let hours;
  if (
    businessStore.selectedTab &&
    userStore.availableSpecialistIds.length > 1
  ) {
    hours = getMaxWorkingHours();
    console.log(hours);
  } else {
    hours = availability.value?.[dayOfWeek];
  }

  if (hours && hours !== "Closed") {
    const [start, end] = hours.split("-");
    console.log(hours);
    return generateTimeSlots(start.trim(), end.trim());
  }
  return [];
});

const selectTime = (time) => {
  console.log(time);
  // Создаем объект moment с выбранной датой и временем
  const selectedDateTime = moment(props.selectedDate).set({
    hour: moment(time.time, "HH:mm").get("hour"),
    minute: moment(time.time, "HH:mm").get("minute"),
    second: 0,
  });
  // Сохранение выбранного времени в userStore
  userStore.setSelectedDateTime(selectedDateTime.toISOString());
  userStore.setSelectedAvailableSpecialistsIds(time.specialistIds);

  // console.log(getMaxWorkingHours());
  // Программный переход на страницу appointmentы
  // router.push("/user/appointment");
};

const getOccupiedSlots = () => {
  let appointments = [];

  if (
    businessStore.selectedTab &&
    userStore.availableSpecialistIds.length > 1
  ) {
    // console.log("слоты для вкладки все доступные");
    userStore.availableSpecialistIds.forEach((specialistId) => {
      const specialistAppointments =
        businessStore.allSpecialistsAppointments[specialistId];
      appointments.push(...Object.values(specialistAppointments || {}));
    });
  } else {
    // console.log("слоты для конкретного специалиста");
    const specialistAppointments =
      businessStore.allSpecialistsAppointments[
        userStore.selectedSpecialist?.id
      ];
    appointments = Object.values(specialistAppointments || {});
  }

  return appointments
    .filter((appointment) => {
      const appointmentDate = moment(appointment.date_time);
      return appointmentDate.isSame(props.selectedDate, "day");
    })
    .map((appointment) => {
      const category = categoriesById[appointment.category_id];
      const service = category?.servicesById[appointment.service_id];

      if (!service) {
        console.error("Service not found for appointment", appointment);
        return null; // or handle error as needed
      }

      const durationStr = service.duration;
      const durationInMinutes = durationToMinutes(durationStr);

      return {
        specialistId: appointment.specialist_id,
        start: moment(appointment.date_time),
        end: moment(appointment.date_time).add(durationInMinutes, "minutes"),
      };
    })
    .filter((slot) => slot); // Filtering out null values
};

const filteredPeriods = computed(() => {
  const occupiedSlots = getOccupiedSlots();
  const totalDuration = getTotalDuration();
  const periods = { Morning: [], Afternoon: [], Evening: [] };
  const now = moment();

  const lastWorkingHourSlot = workingHours.value[workingHours.value.length - 1];
  const endOfWorkingDay = moment(props.selectedDate)
    .set({
      hour: moment(lastWorkingHourSlot, "HH:mm").hour(),
      minute: moment(lastWorkingHourSlot, "HH:mm").minute(),
    })
    .add(15, "minutes");

  for (const slot of workingHours.value) {
    const slotMoment = moment(props.selectedDate).set({
      hour: moment(slot, "HH:mm").hour(),
      minute: moment(slot, "HH:mm").minute(),
    });
    const endOfServiceMoment = slotMoment.clone().add(totalDuration, "minutes");
    const isToday = moment(props.selectedDate).isSame(now, "day");

    // Проверка на текущий день и время, которое уже прошло
    // Проверка на окончание услуги до конца рабочего дня
    if (
      (isToday && slotMoment.isBefore(now)) ||
      endOfServiceMoment.isAfter(endOfWorkingDay)
    )
      continue;

    let slotData = { time: slot, specialistIds: new Set() }; // Данные текущего слота

    // Разделение логики для "Все доступные" и конкретного специалиста
    if (
      businessStore.selectedTab &&
      userStore.availableSpecialistIds.length > 1
    ) {
      userStore.availableSpecialistIds.forEach((specialistId) => {
        const dayOfWeek = moment(props.selectedDate)
          .format("dddd")
          .toLowerCase();
        const specialistAvailability =
          businessStore.selectedBusiness.specialistsById[specialistId]
            .availability[dayOfWeek];

        if (specialistAvailability && specialistAvailability !== "Closed") {
          const [start, end] = specialistAvailability.split("-");
          const startMoment = moment(start.trim(), "HH:mm");
          const endMoment = moment(end.trim(), "HH:mm"); // Рабочее время до

          const slotStartMoment = moment(slot, "HH:mm");
          const slotEndMoment = slotStartMoment
            .clone()
            .add(totalDuration, "minutes"); // Время окончания слота

          // Проверяем, попадает ли слот в рабочее время специалиста
          if (
            slotStartMoment.isSameOrAfter(startMoment) &&
            slotEndMoment.isSameOrBefore(endMoment) // Обновленное условие
          ) {
            // Проверяем, не занят ли специалист в данный момент времени
            const isSpecialistAvailable = !occupiedSlots.some(
              (occupied) =>
                occupied.specialistId === specialistId &&
                slotStartMoment.isBetween(
                  occupied.start,
                  occupied.end,
                  null,
                  "[)"
                )
            );

            if (isSpecialistAvailable) {
              slotData.specialistIds.add(specialistId);
            }
          }
        }
      });
    } else {
      // Логика для конкретного специалиста
      const isSlotOccupied = occupiedSlots.some(
        (occupied) =>
          occupied.specialistId === userStore.selectedSpecialist.id &&
          slotMoment.isBetween(occupied.start, occupied.end, null, "[)")
      );
      if (!isSlotOccupied)
        slotData.specialistIds.add(userStore.selectedSpecialist.id);
    }

    // Добавление слота, если он доступен хотя бы для одного специалиста
    if (slotData.specialistIds.size > 0) {
      const hour = slotMoment.hour();
      if (hour < 12) {
        periods["Morning"].push(slotData);
      } else if (hour >= 12 && hour < 18) {
        periods["Afternoon"].push(slotData);
      } else {
        periods["Evening"].push(slotData);
      }
    }
  }

  return Object.keys(periods)
    .filter((period) => periods[period].length > 0)
    .map((period) => ({
      label: period,
      times: periods[period].map((slotData) => ({
        time: slotData.time,
        specialistIds: Array.from(slotData.specialistIds),
      })),
    }));
});

const getMaxWorkingHours = () => {
  let earliestStart = moment("23:59", "HH:mm");
  let latestEnd = moment("00:00", "HH:mm");
  const dayOfWeek = moment(props.selectedDate).format("dddd").toLowerCase();

  userStore.availableSpecialistIds.forEach((specialistId) => {
    const specialistAvailability =
      businessStore.selectedBusiness.specialistsById[specialistId].availability[
        dayOfWeek
      ];
    if (specialistAvailability && specialistAvailability !== "Closed") {
      const [start, end] = specialistAvailability.split("-");
      console.log(start, end);

      const startMoment = moment(start.trim(), "HH:mm");
      const endMoment = moment(end.trim(), "HH:mm");

      if (startMoment.isBefore(earliestStart)) {
        earliestStart = startMoment;
      }

      if (endMoment.isAfter(latestEnd)) {
        latestEnd = endMoment;
      }
    }
  });

  return `${earliestStart.format("HH:mm")}-${latestEnd.format("HH:mm")}`;
  // Возвращаем время начала и окончания работы в формате HH:mm
  // return {
  //   start: earliestStart.format("HH:mm"),
  //   end: latestEnd.format("HH:mm"),
  // };
};

useRouteLeaveGuard();
</script>
