// Функция для фильтрации идентификаторов специалистов на основе выбранных услуг
export function filterSpecialistsByServices(
  specialistIds,
  specialistsById,
  selectedServiceIds
) {
  return specialistIds.filter((id) =>
    selectedServiceIds.every((serviceId) =>
      specialistsById[id]?.serviceIds.includes(serviceId)
    )
  );
}
