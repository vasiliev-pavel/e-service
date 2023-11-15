export function generateDates() {
  const dates = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Setting the start of the day
  const endPeriod = new Date(today);
  endPeriod.setDate(today.getDate() + 49); // Adding 7 weeks

  for (
    let date = new Date(today);
    date < endPeriod;
    date.setDate(date.getDate() + 1)
  ) {
    dates.push(new Date(date));
  }
  return dates;
}

export const getServiceDuration = (serviceId, categories) => {
  for (const services of Object.values(categories)) {
    const service = services.find((s) => s.id === serviceId);

    if (service) return service.duration;
  }
  return 0;
};

export const parseTime = (timeStr) => {
  const [hours, minutes] = timeStr.split(":").map(Number);
  const nowDate = new Date();
  return new Date(
    nowDate.getFullYear(),
    nowDate.getMonth(),
    nowDate.getDate(),
    hours,
    minutes
  );
};

export const createTimeSlots = (startTime, endTime) => {
  let currentTime = new Date(startTime);
  const slots = [];
  const fifteenMinutes = 15 * 60000;

  while (currentTime < endTime) {
    slots.push(
      currentTime.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
    currentTime = new Date(currentTime.getTime() + fifteenMinutes);
  }

  return slots;
};

export const getWorkingHoursEnd = (availability) => {
  if (availability === "weekend" || !availability.includes("-")) {
    return null; // Если выходной или неверный формат, возвращаем null
  }
  const [, endTime] = availability.split("-"); // Разделяем строку на начало и конец рабочего времени
  return parseTime(endTime); // Возвращаем время окончания рабочего дня
};
export const isToday = (date) => {
  const today = new Date();
  const selectedDay = new Date(date);
  return selectedDay.toDateString() === today.toDateString();
};
