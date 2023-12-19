export const durationToMinutes = (duration) => {
  const parts = duration.split(":");
  return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
};

// export function generateDates() {
//   const dates = [];
//   const today = new Date();
//   today.setHours(0, 0, 0, 0); // Setting the start of the day
//   const endPeriod = new Date(today);
//   endPeriod.setDate(today.getDate() + 49); // Adding 7 weeks

//   for (
//     let date = new Date(today);
//     date < endPeriod;
//     date.setDate(date.getDate() + 1)
//   ) {
//     dates.push(new Date(date));
//   }
//   return dates;
// }

// export const getServiceDuration = (serviceId, categories) => {
//   for (const services of Object.values(categories)) {
//     const service = services.find((s) => s.id === serviceId);

//     if (service) return service.duration;
//   }
//   return 0;
// };

// export const parseTime = (timeStr, selectedDay = new Date()) => {
//   const [hours, minutes] = timeStr.split(":").map(Number);
//   const nowDate = new Date(selectedDay);
//   return new Date(
//     nowDate.getFullYear(),
//     nowDate.getMonth(),
//     nowDate.getDate(),
//     hours,
//     minutes
//   );
// };

// export const createTimeSlots = (startTime, endTime) => {
//   let currentTime = new Date(startTime);
//   const slots = [];
//   const fifteenMinutes = 15 * 60000;

//   while (currentTime < endTime) {
//     slots.push(
//       currentTime.toLocaleTimeString("en-GB", {
//         hour: "2-digit",
//         minute: "2-digit",
//       })
//     );
//     currentTime = new Date(currentTime.getTime() + fifteenMinutes);
//   }

//   return slots;
// };

// export const getWorkingHoursEnd = (availability, selectedDate) => {
//   if (availability === "weekend" || !availability.includes("-")) {
//     return null; // Если выходной или неверный формат, возвращаем null
//   }
//   const [, endTime] = availability.split("-"); // Разделяем строку на начало и конец рабочего времени
//   return parseTime(endTime, selectedDate); // Возвращаем время окончания рабочего дня
// };

// export const isToday = (date) => {
//   const today = new Date();
//   const selectedDay = new Date(date);
//   return selectedDay.toDateString() === today.toDateString();
// };

// export const isSameDay = (date, { day, month, year }) =>
//   date.getDate() === day &&
//   date.getMonth() === month &&
//   date.getFullYear() === year;

// export function processPeriods(
//   periods,
//   serviceDuration,
//   selectedDate,
//   callback
// ) {
//   Object.values(periods).forEach((period) => {
//     for (let i = period.length - 1; i >= 0; i--) {
//       const slotTime = parseTime(period[i], selectedDate);
//       const slotEndTime = new Date(
//         slotTime.getTime() + serviceDuration * 60000
//       );

//       if (callback(slotTime, slotEndTime)) {
//         period.splice(i, 1);
//       }
//     }
//   });
// }
